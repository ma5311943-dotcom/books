import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";

// Get Admin Dashboard Overview Statistics
export const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();

        const orders = await Order.find({ paymentStatus: "Paid" });
        const totalRevenue = orders.reduce((acc, order) => acc + order.finalAmount, 0);

        // Sales data for chart (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentSales = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo },
                    paymentStatus: "Paid"
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: "$finalAmount" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                totalUsers,
                totalBooks,
                totalRevenue
            },
            recentSales
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Latest Orders for Dashboard Table
export const getLatestOrders = async (req, res) => {
    try {
        const latestOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "username email");

        res.status(200).json({
            success: true,
            latestOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
