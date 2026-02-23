import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../assets/Admin/dummyStyles';
import {
    Users,
    BookOpen,
    ShoppingBag,
    TrendingUp,
    ChevronRight,
    Package
} from 'lucide-react';
import { BACKEND_URL } from '../../assets/config';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const AdminDashboard = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalUsers: 0,
        totalBooks: 0,
        totalRevenue: 0
    });
    const [recentSales, setRecentSales] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    fetch(`${BACKEND_URL}/api/dashboard/stats`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${BACKEND_URL}/api/dashboard/latest-orders`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                const statsData = await statsRes.json();
                const ordersData = await ordersRes.json();

                if (statsData.success) {
                    setStats(statsData.stats);
                    setRecentSales(statsData.recentSales);
                }
                if (ordersData.success) {
                    setLatestOrders(ordersData.latestOrders);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchDashboardData();
    }, [token]);

    const statCards = [
        { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
        { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-50 text-purple-600' },
        { title: 'Total Books', value: stats.totalBooks, icon: BookOpen, color: 'bg-orange-50 text-orange-600' },
    ];

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading Dashboard...</div>;

    return (
        <div className={styles.pageBackground}>
            <div className={styles.container}>
                <div className="mb-8">
                    <h1 className={styles.headerTitle}>Dashboard Overview</h1>
                    <p className={styles.headerSubtitle}>Welcome to your bookstore management portal</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, idx) => (
                        <div key={idx} className={styles.statsCard}>
                            <div className={styles.statsCardContent}>
                                <div>
                                    <p className={styles.statsCardLabel}>{stat.title}</p>
                                    <h3 className={styles.statsCardValue}>{stat.value}</h3>
                                </div>
                                <div className={styles.statsIconContainer(stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Sales Revenue (Last 7 Days)</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={recentSales}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#43C6AC" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#43C6AC" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="sales" stroke="#43C6AC" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Order Volume</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={recentSales}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="orders" fill="#2B5876" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Latest Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                        <button className="text-[#43C6AC] text-sm font-medium flex items-center hover:underline">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Payment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {latestOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#43C6AC]">#{order._id.slice(-6).toUpperCase()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.userId?.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.orderStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${order.finalAmount.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${order.paymentStatus === 'Paid' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
