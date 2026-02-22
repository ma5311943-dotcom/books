// ===== Imports =====
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, Stars } from "lucide-react";

// ===== Component =====
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const navigate = useNavigate();

  // ===== Toast Effect =====
  useEffect(() => {
    let timer;
    if (toast.visible && toast.type !== "loading") {
      timer = setTimeout(() => {
        setToast({ visible: false, message: "", type: "" });
        if (toast.type === "success") {
          navigate("/login");
        }
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [toast, navigate]);

  // ===== Handlers =====
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
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

    if (formData.password.length < 8) {
      setToast({
        visible: true,
        message: "Password must be at least 8 characters",
        type: "error",
      });
      return;
    }

    setToast({
      visible: true,
      message: "Creating your profile...",
      type: "loading",
    });

    try {
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setToast({
          visible: true,
          message: "Welcome aboard! Account created.",
          type: "success",
        });
      } else {
        setToast({
          visible: true,
          message: data.message || "Registration failed",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        visible: true,
        message: "Server encountered an error.",
        type: "error",
      });
    }
  };

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
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="mx-auto mb-6 bg-[#43C6AC]/10 w-20 h-20 rounded-3xl flex items-center justify-center text-[#368F7A] -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Stars size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 lowercase tracking-tighter">
            Join Us.
          </h2>
          <p className="text-gray-500 font-medium mt-2">Start your reading journey today</p>
        </div>

        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              Full Username
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#43C6AC] transition-colors" size={20} />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#43C6AC]/20 outline-none text-gray-800 font-medium placeholder-gray-400 transition-all"
                placeholder="What should we call you?"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
          </div>

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
              Strong Password
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
            <p className="text-[10px] text-gray-400 mt-2 px-1 flex items-center gap-1">
              <ShieldCheck size={12} /> Minimum 8 characters required
            </p>
          </div>

          <button
            type="submit"
            disabled={toast.type === "loading"}
            className="w-full bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {toast.type === "loading" ? "Creating Profile..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Already a member?{" "}
          <Link to="/login" className="text-[#43C6AC] font-bold hover:underline ml-1">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
