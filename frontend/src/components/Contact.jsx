import React, { useState } from 'react'
import { MapPin, Mail, Phone, User, MessageCircle, Send, FileText } from 'lucide-react';
import { contactPageStyles as styles } from '../assets/dummystyles';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'info',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ===== Handle Input Change =====
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // ===== Validate Form =====
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    }

    // ===== Handle Submit =====
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setToast({ show: true, message: 'Opening WhatsApp...', type: 'success' });
                submitData();
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
            }, 800);
        } else {
            setToast({ show: true, message: 'Please fill all required fields.', type: 'error' });
            setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
        }
    }

    const submitData = () => {
        const phoneNumber = '917779998880';
        const text = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
        const url = `https://wa.me/${phoneNumber}?text=${text}`;
        window.open(url, '_blank');
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-30 pb-10 px-4 sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Get in Touch</h1>
                <p className="text-gray-500 text-xs">We're here to help you.</p>

                {/* Added Text */}
                <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">
                    Have a project in mind, need support, or want to discuss your ideas?
                    Our team is always ready to assist you with quick responses and professional guidance.
                    Feel free to reach out through the form below or use our contact details.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Contact Information Section - Left */}
                <div className="lg:col-span-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-fit">
                    <h2 className="text-base font-semibold text-gray-800 mb-5">Contact Info</h2>

                    <div className="space-y-5">

                        {/* Added Text */}
                        <p className="text-gray-500 text-sm leading-relaxed">
                            We usually reply within a few hours during working days.
                            For urgent inquiries, WhatsApp is the fastest way to reach us.
                        </p>

                        {/* Location */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 rounded-lg">
                                <MapPin className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-800">Our Location</h3>
                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                    Japan Road Siyala Islamabad
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 rounded-lg">
                                <Mail className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-800">Email</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    ilyas5803689@gmail.com
                                </p>
                            </div>
                        </div>

                        {/* Call us */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <Phone className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">Phone</h3>
                                <p className="text-gray-500 text-[11px] mt-0.5">
                                    +91 3195803689
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WhatsApp Form Section - Right */}
                <div className="lg:col-span-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h2 className="text-base font-semibold text-gray-800 mb-5">Send Message</h2>

                    {/* Added Text */}
                    <p className="text-gray-500 text-sm mb-6">
                        Fill out the form and your message will open directly in WhatsApp.
                        This helps us respond faster and keeps your communication simple and secure.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Name*</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Hexagon Digital Services"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email*</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone (optional)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Subject (optional)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Enter message subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Message*</label>
                            <div className="relative group">
                                <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                                    <MessageCircle className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                </div>
                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Type your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-gray-700 resize-none"
                                />
                            </div>
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#3FB49B] hover:bg-[#349681] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>
                                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    <span>Send via WhatsApp</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300 ${toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                    }`}>
                    {toast.type === "success" ? <Send className="h-5 w-5" /> : null}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}
        </div>
    );
}

export default Contact;
