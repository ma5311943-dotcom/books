import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../assets/Admin/dummyStyles';
import { Users, Trash2, Mail, Shield, User, Search, UserMinus } from 'lucide-react';

const AdminUsers = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/user/list', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchUsers();
    }, [token]);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setUsers(users.filter(user => user._id !== userId));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">Loading User Directory...</div>;

    return (
        <div className={styles.pageBackground}>
            <div className={styles.container}>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className={styles.headerTitle}>User Management</h1>
                        <p className={styles.headerSubtitle}>Monitor and manage registered members and administrators</p>
                    </div>
                    <div className="bg-emerald-100 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Users className="text-emerald-600" size={20} />
                        <div>
                            <p className="text-[10px] text-emerald-800 font-bold uppercase">Total Members</p>
                            <p className="text-xl font-black text-emerald-900">{users.length}</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="relative max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#43C6AC] outline-none text-sm"
                            placeholder="Find users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((u) => (
                        <div key={u._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {u.role}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${u.role === 'admin' ? 'bg-purple-50' : 'bg-[#43C6AC]/10'
                                    }`}>
                                    {u.role === 'admin' ?
                                        <Shield className="text-purple-600" size={28} /> :
                                        <User className="text-[#43C6AC]" size={28} />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 truncate">{u.username}</h3>
                                    <p className="text-xs text-gray-500 font-medium">Joined {new Date(u.createdAt || Date.now()).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="truncate">{u.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Shield size={16} className="text-gray-400" />
                                    <span>{u.role === 'admin' ? 'Full Access' : 'Customer Account'}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                <button className="text-sm font-bold text-gray-400 hover:text-[#43C6AC] transition-colors flex items-center gap-2">
                                    View Activity
                                </button>
                                {u.role !== 'admin' && (
                                    <button
                                        onClick={() => handleDeleteUser(u._id)}
                                        className="p-2 text-red-100 bg-red-500 rounded-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2 px-3 shadow-lg shadow-red-200"
                                    >
                                        <UserMinus size={16} />
                                        <span className="text-xs font-bold uppercase">Remove</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="text-gray-400" size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">No members found</h2>
                        <p className="text-gray-500 mt-2">Try adjusting your search to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
