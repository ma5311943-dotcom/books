import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===== Place Order (Stripe & COD) =====
export const placeOrder = async (req, res) => {
    try {
        const {
            userId,
            items,
            address,
            shippingCharge = 0,
            totalAmount,
            taxAmount = 0,
            finalAmount,
            paymentMethod,
            notes = ""
        } = req.body;

        if (!userId || !items || items.length === 0 || !address || !totalAmount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Missing required order information: User ID, items, address, total amount, or payment method."
            });
        }

        // Calculate totals explicitly before saving to ensure schema validation passes
        const calculatedTotalAmount = items.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0);
        const calculatedShippingCharge = calculatedTotalAmount > 1000 ? 0 : 50;
        const calculatedTaxAmount = calculatedTotalAmount * 0.1;
        const calculatedFinalAmount = calculatedTotalAmount + calculatedTaxAmount + calculatedShippingCharge;

        const newOrder = new Order({
            userId,
            items,
            address,
            shippingCharge: calculatedShippingCharge,
            totalAmount: calculatedTotalAmount,
            taxAmount: calculatedTaxAmount,
            finalAmount: calculatedFinalAmount,
            paymentMethod,
            notes
        });

        await newOrder.save();

        if (paymentMethod === "Online Payment") {
            try {
                const line_items = items.map((item) => ({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: Math.round(Number(item.price) * 100),
                    },
                    quantity: Number(item.quantity) || 1,
                }));

                if (shippingCharge > 0) {
                    line_items.push({
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Shipping Charge",
                            },
                            unit_amount: Math.round(Number(shippingCharge) * 100),
                        },
                        quantity: 1,
                    });
                }

                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: line_items,
                    mode: "payment",
                    success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
                    cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
                    metadata: { orderId: newOrder._id.toString() }
                });

                newOrder.sessionId = session.id;
                await newOrder.save();

                return res.status(200).json({
                    success: true,
                    session_url: session.url
                });
            } catch (stripeError) {
                console.error("Stripe Session Error:", stripeError.message);
                await Order.findByIdAndDelete(newOrder._id);
                return res.status(500).json({
                    success: false,
                    message: "Payment Initialization Error: " + stripeError.message
                });
            }
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Order Place Error:", error.name || "Error", error.message);
        if (error.name === "ValidationError" && error.errors) {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: "Validation Error: " + messages.join(", ")
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// ===== Verify Order =====
export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });
            res.json({ success: true, message: "Payment successful. Order status updated." });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed or was cancelled. Order has been removed." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred during order verification. Please try again later."
        });
    }
};



// ===== Get User Orders =====
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to retrieve orders."
            });
        }

        const orders = await Order.find({ userId }).populate({
            path: "items.book",
            select: "title price author"
        });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



// ===== Update Order Status (Admin) =====
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus, estimatedDeliveryTime } = req.body;

        if (!orderId || !orderStatus) {
            return res.status(400).json({
                success: false,
                message: "Order ID and status are required"
            });
        }

        const updateData = { orderStatus };

        if (orderStatus === 'Shipped' && estimatedDeliveryTime) {
            updateData.estimatedDeliveryTime = Number(estimatedDeliveryTime);
            updateData.deliveryStartedAt = new Date();
        }

        if (orderStatus === 'Delivered') {
            updateData.deliveredAt = new Date();
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated",
            order: updatedOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



// ===== List All Orders (Admin) =====
export const listAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("userId", "username email")
            .populate({
                path: "items.book",
                select: "title price"
            });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// ===== Rate Order (User) =====
export const rateOrder = async (req, res) => {
    try {
        const { orderId, rating, review } = req.body;

        if (!orderId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Order ID and rating are required"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { rating, review },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order rated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};