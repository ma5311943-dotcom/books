// ===== Imports =====
import Cart from "../models/cartModel.js";
import Book from "../models/bookModel.js";

// ===== Functions =====

// add to cart
export const addToCart = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Book ID are required",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ bookId, quantity: quantity || 1 }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.bookId.toString() === bookId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ bookId, quantity: quantity || 1 });
            }
            await cart.save();
        }

        const updatedCart = await Cart.findOne({ userId }).populate("items.bookId");
        res.status(200).json({
            success: true,
            message: "Added to cart",
            cart: updatedCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// remove cart item
export const removeCartItem = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Book ID are required",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
            await cart.save();
        }

        const updatedCart = await Cart.findOne({ userId }).populate("items.bookId");
        res.status(200).json({
            success: true,
            message: "Removed from cart",
            cart: updatedCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        if (!userId || !bookId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "User ID, Book ID and quantity are required",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(
                (item) => item.bookId.toString() === bookId
            );
            if (itemIndex > -1) {
                if (quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = quantity;
                }
                await cart.save();
            }
        }

        const updatedCart = await Cart.findOne({ userId }).populate("items.bookId");
        res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: updatedCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// get user cart
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const cart = await Cart.findOne({ userId }).populate("items.bookId");

        res.status(200).json({
            success: true,
            cart: cart || { items: [] },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// clear user cart
export const clearUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items = [];
            await cart.save();
        }

        const updatedCart = await Cart.findOne({ userId }).populate("items.bookId");
        res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart: updatedCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};