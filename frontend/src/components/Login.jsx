// ===== Imports =====
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from "../assets/config";

// ===== Component =====
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  // ===== Toast Effect =====
  useEffect(() => {
    let timer;
    if (toast.visible && toast.type !== "loading") {
      timer = setTimeout(() => {
        setToast({ visible: false, message: "", type: "" });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toast]);

  // ===== Handlers =====
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setToast({
        visible: true,
        message: "All fields required",
        type: "error",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({
        visible: true,
        message: "Invalid email address",
        type: "error",
      });
      return;
    }

    setToast({ visible: true, message: "Logging in...", type: "loading" });

    try {
      const response = await fetch(`${BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        login(data.user, data.token);
        setToast({
          visible: true,
          message: "Login successful",
          type: "success",
        });
        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        setToast({
          visible: true,
          message: data.message || "Login failed",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        visible: true,
        message: "Server error. Please try again later.",
        type: "error",
      });
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 text-center space-y-6 border border-gray-100">
          <div className="mx-auto bg-[#43C6AC]/10 w-24 h-24 rounded-full flex items-center justify-center text-[#368F7A] shadow-inner">
            <User size={48} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome Back!
            </h2>
            <p className="text-gray-500 font-semibold uppercase text-[10px] tracking-widest mt-1">{user.username}</p>
          </div>

          <div className="space-y-3">
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all"
            >
              <User size={18} /> Continue Shopping
            </Link>

            {user.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="w-full flex items-center justify-center gap-3 bg-[#1A237E] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-indigo-100 hover:scale-[1.02] transition-all"
              >
                <LayoutDashboard size={18} /> Admin Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 text-red-500 bg-red-50 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-100 transition-all border border-red-100"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== JSX =====
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 text-sm font-semibold rounded-xl shadow-2xl z-50 animate-bounce ${toast.type === "error"
            ? "bg-red-500 text-white"
            : toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-blue-500 text-white"
            }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#43C6AC] to-[#2B5876]"></div>

        <Link
          to="/"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 hover:text-[#43C6AC] transition-colors gap-2"
        >
          <ArrowLeft size={16} /> Back to Library
        </Link>

        <div className="text-center mb-10">
          <div className="mx-auto mb-6 bg-[#43C6AC]/10 w-20 h-20 rounded-3xl flex items-center justify-center text-[#368F7A] rotate-3 hover:rotate-0 transition-transform duration-500">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 lowercase tracking-tighter">
            Login.
          </h2>
          <p className="text-gray-500 font-medium mt-2">Access your personalized collection</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#43C6AC] transition-colors" size={20} />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#43C6AC]/20 outline-none text-gray-800 font-medium placeholder-gray-400 transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              Secret Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#43C6AC] transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#43C6AC]/20 outline-none text-gray-800 font-medium placeholder-gray-400 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#43C6AC] transition-all"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-[10px] font-bold uppercase text-[#43C6AC] hover:underline">Forgot?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={toast.type === "loading"}
            className="w-full bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {toast.type === "loading" ? "Authenticating..." : "Enter Account"}
          </button>
        </form>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">or Join our community</p>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          New here?{" "}
          <Link to="/signup" className="text-[#43C6AC] font-bold hover:underline ml-1">
            Create Profile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
