import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../assets/Admin/dummyStyles';
import {
    Package,
    Search,
    Eye,
    MapPin,
    Clock,
    CreditCard,
    X,
    CheckCircle,
    Truck,
    Star
} from 'lucide-react';
import { BACKEND_URL } from '../../assets/config';

const AdminOrders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editDeliveryTime, setEditDeliveryTime] = useState("");

    useEffect(() => {
        if (selectedOrder) {
            setEditDeliveryTime(selectedOrder.estimatedDeliveryTime || "");
        } else {
            setEditDeliveryTime("");
        }
    }, [selectedOrder]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/order/list`, {
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

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    const handleStatusUpdate = async (orderId, newStatus, deliveryTime = null) => {
        try {
            const body = { orderId, orderStatus: newStatus };
            if (newStatus === 'Shipped' && deliveryTime) {
                body.estimatedDeliveryTime = deliveryTime;
            }

            const response = await fetch(`${BACKEND_URL}/api/order/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (data.success) {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, ...data.order } : order
                ));
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder({ ...selectedOrder, ...data.order });
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.userId?.username?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter ? order.orderStatus === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    if (loading) return <div className="p-8 text-center">Loading Orders...</div>;

    return (
        <div className={styles.pageBackground}>
            <div className={styles.container}>
                <div className="mb-8">
                    <h1 className={styles.headerTitle}>Order Management</h1>
                    <p className={styles.headerSubtitle}>Monitor and process customer orders</p>
                </div>

                <div className={styles.controlsContainer}>
                    <div className={styles.controlsInner}>
                        <div className={styles.searchContainer}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search by Order ID or Customer Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43C6AC] outline-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.ordersTableContainer}>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Payment Method</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-[#43C6AC]">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{order.userId?.username}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                            order.orderStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">${order.finalAmount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{order.paymentMethod}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Order #{selectedOrder._id.toUpperCase()}</h2>
                                <p className="text-xs text-gray-500 mt-1">Placed on {new Date(selectedOrder.placedAt).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Customer & Shipping */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <MapPin size={16} className="text-[#43C6AC]" /> Shipping Details
                                    </h3>
                                    <div className="text-sm space-y-2 text-gray-700">
                                        <p className="font-bold text-gray-900">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                                        <p>{selectedOrder.address.street}</p>
                                        <p>{selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zipCode}</p>
                                        <p className="pt-2 border-t border-gray-100 font-medium">{selectedOrder.address.email}</p>
                                        <p className="text-gray-500 text-xs">{selectedOrder.address.phone}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <CreditCard size={16} className="text-[#43C6AC]" /> Payment Info
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Method</span>
                                            <span className="text-sm font-bold text-gray-800">{selectedOrder.paymentMethod}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Status</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${selectedOrder.paymentStatus === 'Paid' ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'
                                                }`}>
                                                {selectedOrder.paymentStatus}
                                            </span>
                                        </div>
                                        {selectedOrder.rating && (
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Customer Rating</p>
                                                <div className="flex items-center gap-1 text-amber-500 font-bold">
                                                    <Star size={14} fill="currentColor" /> {selectedOrder.rating}/5
                                                </div>
                                                {selectedOrder.review && <p className="text-xs text-gray-600 mt-1 italic italic">"{selectedOrder.review}"</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="lg:col-span-2">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Package size={16} className="text-[#43C6AC]" /> Order Items
                                </h3>
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                            <div className="h-16 w-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden shadow-sm">
                                                <img
                                                    src={`${BACKEND_URL}/uploads/${item.image}`}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5 font-medium">{item.author}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">Qty: {item.quantity}</span>
                                                    <span className="text-sm font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 border-t border-dashed border-gray-200 pt-6 px-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-bold text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span className="font-bold text-emerald-600">${selectedOrder.shippingCharge.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Tax</span>
                                            <span className="font-bold text-gray-900">${selectedOrder.taxAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-gray-100">
                                            <span className="text-lg font-bold text-gray-900">Final Total</span>
                                            <span className="text-2xl font-bold text-[#43C6AC]">${selectedOrder.finalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-[#2B5876] rounded-2xl">
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <Clock size={16} /> Update Order Status
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    if (status === 'Shipped') {
                                                        if (editDeliveryTime) {
                                                            handleStatusUpdate(selectedOrder._id, 'Shipped', editDeliveryTime);
                                                        } else {
                                                            alert("Please enter the delivery window (hours) first!");
                                                        }
                                                    } else {
                                                        handleStatusUpdate(selectedOrder._id, status);
                                                    }
                                                }}
                                                className={`py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${selectedOrder.orderStatus === status
                                                    ? 'bg-[#43C6AC] text-white shadow-lg'
                                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                                    }`}
                                            >
                                                {status === 'Shipped' && <Truck size={14} />}
                                                {status === 'Delivered' && <CheckCircle size={14} />}
                                                {status}
                                            </button>
                                        ))}
                                    </div>

                                    {(selectedOrder.orderStatus === 'Shipped' || selectedOrder.orderStatus === 'Pending') && (
                                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Expected Delivery Window</p>
                                                {selectedOrder.estimatedDeliveryTime && (
                                                    <span className="text-[10px] bg-[#43C6AC]/20 text-[#43C6AC] px-2 py-1 rounded-lg">Active: {selectedOrder.estimatedDeliveryTime}h</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                                    <input
                                                        type="number"
                                                        placeholder="Hours (e.g. 24)"
                                                        className="w-full bg-white/10 border-0 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#43C6AC] outline-none transition-all"
                                                        value={editDeliveryTime}
                                                        onChange={(e) => setEditDeliveryTime(e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (!editDeliveryTime) return alert("Enter hours first");
                                                        handleStatusUpdate(selectedOrder._id, 'Shipped', editDeliveryTime);
                                                    }}
                                                    className="px-6 py-3 bg-[#43C6AC] text-white text-xs font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
                                                >
                                                    {selectedOrder.orderStatus === 'Shipped' ? 'Update' : 'Ship'}
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-white/40 mt-3 leading-relaxed font-medium">
                                                * Entering hours and clicking ship/update will notify the customer and start their arrival countdown.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
