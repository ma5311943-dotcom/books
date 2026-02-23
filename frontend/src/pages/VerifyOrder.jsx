import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../cartContext/CartContext';
import { CheckCircle, XCircle, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BACKEND_URL } from '../assets/config';

const VerifyOrder = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { token } = useAuth();
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying");

    const verifyPayment = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/order/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ success, orderId })
            });
            const data = await response.json();
            if (data.success) {
                if (success === "true") {
                    await clearCart();
                    setStatus("success");
                } else {
                    setStatus("failed");
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Verification error:", error);
            setStatus("error");
        }
    };

    useEffect(() => {
        if (token && orderId) {
            verifyPayment();
        }
    }, [token, orderId]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
                <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 text-center">
                    {status === "verifying" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <Loader2 size={64} className="text-[#43C6AC] animate-spin" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Verifying Payment</h2>
                            <p className="text-gray-500 font-medium">Please wait while we confirm your transaction...</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="bg-emerald-100 p-6 rounded-full">
                                    <CheckCircle size={64} className="text-emerald-500" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Payment Successful!</h2>
                            <p className="text-gray-600 font-medium">Your order has been placed and is being processed. Thank you for shopping with us!</p>
                            <div className="pt-8 space-y-4">
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="w-full py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                >
                                    View My Orders <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-4 border-2 border-gray-100 text-gray-600 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    )}

                    {status === "failed" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="bg-red-100 p-6 rounded-full">
                                    <XCircle size={64} className="text-red-500" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Payment Failed</h2>
                            <p className="text-gray-600 font-medium">Unfortunately, your payment could not be processed. If this was an accident, you can try again.</p>
                            <div className="pt-8 space-y-4">
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                >
                                    Return to Cart <ShoppingBag size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="bg-amber-100 p-6 rounded-full">
                                    <XCircle size={64} className="text-amber-500" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Something Went Wrong</h2>
                            <p className="text-gray-600 font-medium">We encountered an error while verifying your payment. Please contact support if the issue persists.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-8 w-full py-4 bg-[#2B5876] text-white rounded-2xl font-bold uppercase tracking-widest"
                            >
                                Contact Support
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VerifyOrder;
