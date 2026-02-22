import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center font-semibold">Authenticating...</div>;

    // Protect Admin Routes
    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 pt-16 lg:pt-20">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
