import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true }
}, { _id: false });

const itemSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [itemSchema], required: true },
    address: { type: addressSchema, required: true },
    shippingCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ["Online Payment", "Cash on Delivery"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Unpaid", "Paid"],
        default: "Unpaid"
    },
    sessionId: { type: String },
    paymentIntentId: { type: String },
    notes: { type: String },
    deliveryDate: { type: Date },
    estimatedDeliveryTime: { type: Number }, // in hours
    deliveryStartedAt: { type: Date },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    deliveredAt: { type: Date },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    placedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Calculations handled in the controller before saving to avoid middleware versioning issues
const Order = mongoose.model("Order", orderSchema);
export default Order;
