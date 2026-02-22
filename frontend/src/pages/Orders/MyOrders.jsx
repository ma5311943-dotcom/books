import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Calendar, Info, ShoppingBag, Star, Layout } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Countdown = ({ startedAt, hours }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const start = new Date(startedAt).getTime();
            const end = start + hours * 60 * 60 * 1000;
            const now = new Date().getTime();
            const diff = end - now;

            if (diff <= 0) return "Arriving Now";
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            return `${h}h ${m}m left`;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        setTimeLeft(calculateTimeLeft());
        return () => clearInterval(timer);
    }, [startedAt, hours]);

    return (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <Clock size={14} />
            <span>Arriving in {timeLeft}</span>
        </div>
    );
};

const OrderProgress = ({ status }) => {
    const steps = ['Pending', 'Shipped', 'Delivered'];
    const currentIndex = steps.indexOf(status);
    const progress = status === 'Cancelled' ? 0 : (currentIndex / (steps.length - 1)) * 100;

    return (
        <div className="mt-8 mb-4">
            <div className="relative flex justify-between">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-0 rounded-full"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#43C6AC] to-[#2B5876] -translate-y-1/2 z-0 transition-all duration-1000 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>

                {steps.map((step, i) => (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${i <= currentIndex && status !== 'Cancelled' ? 'bg-[#43C6AC] text-white shadow-lg' : 'bg-white border-2 border-gray-100 text-gray-300'
                            }`}>
                            {i < currentIndex ? <CheckCircle size={16} /> : (i === 1 ? <Truck size={16} /> : <Package size={16} />)}
                        </div>
                        <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${i <= currentIndex && status !== 'Cancelled' ? 'text-gray-900' : 'text-gray-400'
                            }`}>{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MyOrders = () => {
    const { token, user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratingOrder, setRatingOrder] = useState(null);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/order/user/${user._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRatingSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/order/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ orderId: ratingOrder._id, rating, review })
            });
            const data = await response.json();
            if (data.success) {
                setOrders(orders.map(o => o._id === ratingOrder._id ? data.order : o));
                setRatingOrder(null);
                setRating(5);
                setReview("");
            }
        } catch (error) {
            console.error("Error rating order:", error);
        }
    };

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="text-amber-500" size={18} />;
            case 'Shipped': return <Truck className="text-blue-500" size={18} />;
            case 'Delivered': return <CheckCircle className="text-emerald-500" size={18} />;
            case 'Cancelled': return <XCircle className="text-red-500" size={18} />;
            default: return <Info className="text-gray-500" size={18} />;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading your orders...</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                            <p className="text-gray-500 font-medium mt-1">Track and manage your book purchases</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hidden md:block">
                            <Package size={32} className="text-[#43C6AC]" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        {orders.length > 0 ? orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                                {/* Order Header */}
                                <div className="bg-gray-50 p-6 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1">Order ID</p>
                                            <p className="text-sm font-semibold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1">Placed On</p>
                                            <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(order.placedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1">Final Amount</p>
                                            <p className="text-sm font-bold text-[#43C6AC]">${order.finalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col items-end">
                                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1">Current Status</p>
                                            <div className="flex items-center gap-3">
                                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${order.orderStatus === 'Pending' ? 'bg-amber-50 border-amber-100' :
                                                    order.orderStatus === 'Shipped' ? 'bg-blue-50 border-blue-100' :
                                                        order.orderStatus === 'Delivered' ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100'
                                                    }`}>
                                                    {getStatusIcon(order.orderStatus)}
                                                    <span className="text-xs font-bold uppercase text-gray-700">
                                                        {order.orderStatus === 'Shipped' ? 'In Transit' : order.orderStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 flex flex-col md:flex-row gap-8 items-start">
                                    {/* Tracking Section */}
                                    <div className="w-full md:w-1/2 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Track Parcel</h3>
                                        <p className="text-sm font-semibold text-gray-700 mb-2">
                                            {order.orderStatus === 'Pending' && "We're preparing your books for dispatch."}
                                            {order.orderStatus === 'Shipped' && "Your package is currently on its way!"}
                                            {order.orderStatus === 'Delivered' && "Books successfully delivered. Happy reading!"}
                                            {order.orderStatus === 'Cancelled' && "This order was cancelled."}
                                        </p>
                                        <OrderProgress status={order.orderStatus} />
                                        {order.orderStatus === 'Shipped' && order.deliveryStartedAt && order.estimatedDeliveryTime && (
                                            <div className="mt-4">
                                                <Countdown startedAt={order.deliveryStartedAt} hours={order.estimatedDeliveryTime} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 w-full flex flex-col justify-center">
                                        <div className="space-y-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-4 items-center">
                                                    <div className="h-14 w-10 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
                                                        <img
                                                            src={`http://localhost:4000/uploads/${item.image}`}
                                                            alt={item.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</h4>
                                                        <p className="text-[10px] text-gray-500 font-medium">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Actions/Footer */}
                                <div className="mt-8 pt-8 border-t border-dashed border-gray-100 flex flex-wrap justify-between items-center gap-6">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                                        <MapPin size={14} />
                                        <span className="font-medium truncate max-w-[200px] md:max-w-none">
                                            Shipping to {order.address.firstName}, {order.address.city}
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        {order.orderStatus === 'Delivered' && !order.rating && (
                                            <button
                                                onClick={() => setRatingOrder(order)}
                                                className="px-6 py-2.5 bg-[#43C6AC] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                                            >
                                                <Star size={14} /> Rate Service
                                            </button>
                                        )}
                                        {order.rating && (
                                            <div className="flex items-center gap-1 text-amber-500 font-bold px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
                                                <Star size={14} fill="currentColor" /> {order.rating}/5
                                            </div>
                                        )}
                                        <button
                                            onClick={fetchOrders}
                                            className="px-6 py-2.5 border-2 border-[#43C6AC] text-[#43C6AC] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-50 transition-colors"
                                        >
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBag size={40} className="text-gray-300" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">No orders found</h2>
                                <p className="text-gray-500 mt-2 font-medium">You haven't placed any orders yet. Start exploring!</p>
                                <Link
                                    to="/books"
                                    className="mt-12 px-10 py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-100"
                                >
                                    Browse Books
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {ratingOrder && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rate Your Delivery</h2>
                            <p className="text-gray-500 text-sm mb-8 font-medium">How was your experience with Order #{ratingOrder._id.slice(-6).toUpperCase()}?</p>

                            <form onSubmit={handleRatingSubmit} className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Select Rating</label>
                                    <div className="flex justify-center gap-3">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => setRating(num)}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${rating >= num ? 'bg-amber-100 text-amber-500 border-2 border-amber-200' : 'bg-gray-50 text-gray-400 border-2 border-transparent'
                                                    }`}
                                            >
                                                <Star size={24} fill={rating >= num ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Share Feedback</label>
                                    <textarea
                                        className="w-full p-5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#43C6AC] outline-none font-medium h-32 resize-none"
                                        placeholder="Tell us about the delivery and quality..."
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setRatingOrder(null)}
                                        className="flex-1 py-4 text-gray-500 font-bold uppercase text-xs tracking-widest hover:bg-gray-50 rounded-2xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
