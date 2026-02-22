import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    PlusCircle,
    List,
    Package,
    Users,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    BookOpen
} from 'lucide-react';
import { styles } from '../../assets/Admin/dummyStyles';
import logo from '../../assets/logoicon.png';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { title: 'Add Books', path: '/admin/add-books', icon: PlusCircle },
        { title: 'List Books', path: '/admin/list-books', icon: List },
        { title: 'Orders', path: '/admin/orders', icon: Package },
        { title: 'Users', path: '/admin/users', icon: Users },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-[#43C6AC] text-white rounded-lg shadow-lg"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Desktop */}
            <aside className={styles.sidebar.container(isCollapsed) + " hidden lg:flex flex-col sticky top-16 lg:top-20 h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)]"}>
                <div className={styles.sidebar.header}>
                    {/* Logo removed as it exists in Navbar */}
                    <button
                        className={styles.sidebar.collapseButton}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className={styles.sidebar.nav}>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => styles.sidebar.navItem(isCollapsed, isActive)}
                        >
                            <div className={styles.sidebar.navItemInner}>
                                <div className="flex items-center">
                                    <item.icon size={22} className={isCollapsed ? "" : "mr-3"} />
                                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto">
                    <div className={styles.sidebar.divider}></div>
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center p-3 rounded-lg hover:bg-red-500/20 text-red-100 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut size={22} className={isCollapsed ? "" : "mr-3"} />
                        {!isCollapsed && <span className="font-medium">Sign Out</span>}
                    </button>

                    <div className={styles.sidebar.footer(isCollapsed)}>
                        {!isCollapsed && (
                            <div className="mt-4 flex items-center gap-3 px-2">
                                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                                    <Users size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold truncate w-24">{user?.username || 'Admin'}</span>
                                    <span className="text-[10px] opacity-70 uppercase tracking-wider font-medium">Administrator</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Drawer Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-t from-[#2B5876] to-[#43C6AC] transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    {/* Logo removed as it exists in Navbar */}

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-white font-medium ${isActive ? 'bg-[#2B5876]/90' : 'hover:bg-[#2B5876]/50'}`}
                            >
                                <item.icon size={22} />
                                <span>{item.title}</span>
                            </NavLink>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-100 font-medium hover:bg-red-500/20"
                        >
                            <LogOut size={22} />
                            <span>Sign Out</span>
                        </button>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
