import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../cartContext/CartContext';
import { styles } from '../assets/dummystyles';
import { ShoppingCart, ArrowRight, Truck, ShieldCheck, Tag, Trash2, Plus, Minus, PackageOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.items.reduce((acc, item) => {
    const price = item.bookId?.price || item.price || 0;
    return acc + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-20">
          <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 text-center max-w-lg w-full">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingCart size={48} className="text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed">
              Looks like you haven't added anything to your library yet. Start exploring our vast collection of stories!
            </p>
            <Link
              to="/books"
              className="w-full py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all flex items-center justify-center"
            >
              Browse Books
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
              Your Library Cart <span className="text-lg font-semibold bg-[#43C6AC] text-white px-3 py-1 rounded-full">{cart.items.length}</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2">Finish your purchase to start your next adventure</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.items.map((item) => (
                <div key={item.bookId._id || item.bookId} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex flex-col md:flex-row gap-8 hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group">
                  <div className="w-full md:w-32 h-44 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                    <img
                      src={item.bookId.image ? `https://e-commerce-1-ku99.onrender.com/uploads/${item.bookId.image}` : `https://e-commerce-1-ku99.onrender.com/uploads/${item.image}`}
                      alt={item.bookId.title || item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.bookId.title || item.title}</h3>
                        <p className="text-gray-400 font-semibold uppercase text-[10px] tracking-widest mt-1">{item.bookId.author || item.author}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase tracking-tight border border-emerald-100">In Stock</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><Truck size={12} /> Express Shipping</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.bookId._id || item.bookId)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
                        <button
                          onClick={() => updateQuantity(item.bookId._id || item.bookId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-white rounded-xl text-gray-500 disabled:opacity-30 transition-all shadow-sm"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.bookId._id || item.bookId, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded-xl text-emerald-600 transition-all shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Price</p>
                        <p className="text-2xl font-bold text-[#2B5876]">${((item.bookId?.price || item.price || 0) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 sticky top-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 lowercase tracking-tighter">Summary.</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Shipping</span>
                    <span className="font-bold text-emerald-500">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Tax Estimates</span>
                    <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-dashed border-gray-200 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Final Price</span>
                    <span className="text-3xl font-bold text-[#43C6AC]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl mb-8 flex items-center gap-4 border border-emerald-100">
                  <div className="bg-white p-2 rounded-xl shadow-sm"><Tag size={20} className="text-emerald-500" /></div>
                  <div>
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Free Shipping</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Orders over $1000 qualify</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white text-sm rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-3">
                    <ShieldCheck size={20} className="text-gray-300 mb-2" />
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Secure Payment</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-3">
                    <PackageOpen size={20} className="text-gray-300 mb-2" />
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
