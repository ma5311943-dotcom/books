import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Save, CheckCircle, Smartphone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
    const { user, token, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const showToast = (message, type) => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast({ visible: false, message: '', type: '' }), 3000);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://e-commerce-1-ku99.onrender.com/api/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                login(data.user, token); // Update auth context
                showToast("Profile updated successfully!", "success");
            } else {
                showToast(data.message || "Failed to update profile", "error");
            }
        } catch (error) {
            showToast("Server error", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen pt-32 text-center">Please login to view profile</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
                {toast.visible && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                        <CheckCircle />
                        <span className="font-medium">{toast.message}</span>
                    </div>
                )}

                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Summary Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#43C6AC] to-[#2B5876]"></div>
                                <div className="w-24 h-24 bg-gradient-to-br from-[#43C6AC] to-[#2B5876] rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-xl">
                                    <User size={48} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 truncate">{user.username}</h2>
                                <p className="text-gray-500 font-medium text-sm mt-1">{user.email}</p>
                                <div className="mt-6 flex justify-center">
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-[#43C6AC]/10 text-[#43C6AC]'
                                        }`}>
                                        {user.role} Account
                                    </span>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-50 space-y-4 text-left">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="bg-gray-50 p-2 rounded-lg"><Mail size={16} /></div>
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="bg-gray-50 p-2 rounded-lg"><Shield size={16} /></div>
                                        <span>Member since 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <User className="text-[#43C6AC]" /> Edit Profile Settings
                                </h3>

                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Username</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#43C6AC] outline-none font-medium"
                                                    value={formData.username}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="email"
                                                    disabled
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-500 font-medium cursor-not-allowed"
                                                    value={formData.email}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Phone Number</label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#43C6AC] outline-none font-medium"
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Location</label>
                                            <div className="relative">
                                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#43C6AC] outline-none font-medium"
                                                    placeholder="City, Country"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                        >
                                            {loading ? "Saving..." : (
                                                <>
                                                    Save Changes <Save size={20} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
