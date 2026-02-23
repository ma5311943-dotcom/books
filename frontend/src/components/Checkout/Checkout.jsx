import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../cartContext/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Phone, Mail, User, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { BACKEND_URL } from '../../assets/config';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: user?.email || '',
        street: '', city: '', state: '', zipCode: '', phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState("Online Payment");

    const totalAmount = cart.items.reduce((acc, item) => {
        const price = item.bookId?.price || item.price || 0;
        return acc + (price * item.quantity);
    }, 0);
    const shippingCharge = totalAmount > 1000 ? 0 : 50;
    const taxAmount = totalAmount * 0.1;
    const finalAmount = totalAmount + shippingCharge + taxAmount;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            userId: user._id,
            items: cart.items.map(item => {
                const bookData = item.bookId && typeof item.bookId === 'object' ? item.bookId : {};
                return {
                    book: bookData._id || item.bookId,
                    title: bookData.title || item.title || 'Unknown Title',
                    price: Number(bookData.price || item.price || 0),
                    author: bookData.author || item.author || 'Unknown Author',
                    image: bookData.image || item.image || '',
                    quantity: item.quantity
                };
            }),
            totalAmount,
            address: formData,
            paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod
        };

        console.log("Order Payload:", JSON.stringify(orderData, null, 2));

        try {
            const response = await fetch(`${BACKEND_URL}/api/order/place`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();
            if (data.success) {
                if (paymentMethod === "Online Payment") {
                    window.location.replace(data.session_url);
                } else {
                    await clearCart();
                    navigate('/orders');
                }
            } else {
                alert(data.message || "Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.items.length === 0) {
        return <div className="min-h-screen pt-32 text-center font-semibold">Your cart is empty</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
                            {/* Shipping Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                        <MapPin className="text-[#43C6AC]" /> Delivery Information
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({
                                            firstName: 'John',
                                            lastName: 'Doe',
                                            email: user?.email || 'test@example.com',
                                            street: '123 Test Street',
                                            city: 'New York',
                                            state: 'NY',
                                            zipCode: '10001',
                                            phone: '1234567890'
                                        })}
                                        className="text-xs font-semibold text-[#43C6AC] hover:underline"
                                    >
                                        Fill Test Data
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required name="firstName" placeholder="First Name" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0" onChange={handleInputChange} value={formData.firstName} />
                                    <input required name="lastName" placeholder="Last Name" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0" onChange={handleInputChange} value={formData.lastName} />
                                    <input required type="email" name="email" placeholder="Email Address" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0 md:col-span-2" onChange={handleInputChange} value={formData.email} />
                                    <input required name="street" placeholder="Street Address" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0 md:col-span-2" onChange={handleInputChange} value={formData.street} />
                                    <input required name="city" placeholder="City" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0" onChange={handleInputChange} value={formData.city} />
                                    <input required name="state" placeholder="State" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0" onChange={handleInputChange} value={formData.state} />
                                    <input required name="zipCode" placeholder="Zip Code" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0" onChange={handleInputChange} value={formData.zipCode} />
                                    <input required name="phone" placeholder="Phone Number" className="p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#43C6AC] border-0" onChange={handleInputChange} value={formData.phone} />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <CreditCard className="text-[#43C6AC]" /> Payment Method
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'Online Payment' ? 'border-[#43C6AC] bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}
                                        onClick={() => setPaymentMethod('Online Payment')}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Online Payment' ? 'border-[#43C6AC]' : 'border-gray-300'}`}>
                                            {paymentMethod === 'Online Payment' && <div className="w-2.5 h-2.5 bg-[#43C6AC] rounded-full" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Stripe / Online</p>
                                            <p className="text-xs text-gray-500 font-medium">Pay securely with card</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'COD' ? 'border-[#43C6AC] bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}
                                        onClick={() => setPaymentMethod('COD')}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-[#43C6AC]' : 'border-gray-300'}`}>
                                            {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 bg-[#43C6AC] rounded-full" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500 font-medium">Pay when you receive</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                                {cart.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 line-clamp-1 flex-1 mr-4">{item.bookId.title || item.title} x {item.quantity}</span>
                                        <span className="font-semibold text-gray-900">${((item.bookId?.price || item.price || 0) * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 border-t border-dashed border-gray-200 pt-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-emerald-600">{shippingCharge === 0 ? 'FREE' : `$${shippingCharge.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax (10%)</span>
                                    <span className="font-semibold text-gray-900">${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-100">
                                    <span className="text-lg font-bold text-gray-800">Grand Total</span>
                                    <span className="text-2xl font-bold text-[#43C6AC]">${finalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full mt-8 py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                            >
                                {loading ? "Processing..." : (
                                    <>
                                        {paymentMethod === "Online Payment" ? "Proceed to Payment" : "Place Order Now"}
                                        <CheckCircle size={18} />
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-[10px] text-center text-gray-400 font-semibold uppercase tracking-widest leading-relaxed">
                                {paymentMethod === "Online Payment" ? "Safe & Secure Redirect to Stripe Card Entrance" : "Secure Checkout Powered by Stripe"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
