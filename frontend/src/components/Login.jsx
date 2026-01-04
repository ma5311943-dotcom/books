// ===== Imports =====
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";

// ===== Component =====
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== Toast Effect =====
  useEffect(() => {
    let timer;
    if (toast.visible && toast.type === "loading") {
      timer = setTimeout(() => {
        setToast({
          visible: true,
          message: "Login successful",
          type: "success",
        });
        setIsSubmitting(true);
        localStorage.setItem("authToken", "demoToken");
      }, 1500);
    }

    if (toast.visible && toast.type === "success") {
      timer = setTimeout(() => {
        setToast({ visible: false, message: "", type: "" });
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [toast]);

  // ===== Handlers =====
  const handleLogin = (e) => {
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
  };

  const handleSignOut = () => {
    setIsSubmitting(false);
    setFormData({ email: "", password: "" });
    localStorage.removeItem("authToken");
  };

  // ===== JSX =====
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-1 overflow-hidden">
      {toast.visible && (
        <div
          className={`fixed top-2 right-2 p-2 text-sm rounded-md ${
            toast.type === "error"
              ? "bg-red-100 text-red-700"
              : toast.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-sm bg-white rounded-md shadow-sm p-5">
        {!isSubmitting ? (
          <>
            <Link
              to="/signup"
              className="flex items-center text-sm text-gray-600 mb-4"
            >
              <ArrowLeft size={14} className="mr-2" /> Back
            </Link>

            <div className="text-center mb-6">
              <div className="mx-auto mb-3 bg-gray-100 w-fit p-2 rounded-full">
                <User
                  size={20}
                  className="text-white bg-[#368F7A] p-1 rounded-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-600">Login to your account</p>
            </div>

            <form className="space-y-3" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-2 inset-y-0 h-5 w-5 m-auto text-white bg-[#368F7A] p-0.5 rounded-full" />
                  <input
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2 inset-y-0 h-5 w-5 m-auto text-white bg-[#368F7A] p-0.5 rounded-full" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-9 pr-9 py-2 text-sm border rounded-md focus:ring-1 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-2 inset-y-0 m-auto text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button className="w-full bg-[#43C6AC] text-white py-2 text-sm rounded-md hover:bg-[#368f7a] transition-colors">
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              No account?{" "}
              <Link to="/signup" className="text-[#43C6AC] hover:underline">
                Create Account
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center space-y-3">
            <div className="mx-auto mb-3 bg-gray-100 w-fit p-2 rounded-full">
              <User
                size={20}
                className="text-white bg-[#368F7A] p-1 rounded-full"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back, {formData.email.split("@")[0] || "User"}
            </h2>

            <Link
              to="/"
              className="w-full inline-block bg-[#43C6AC] text-white py-2 rounded-md hover:bg-[#368f7a] transition-colors"
            >
              Go to Home
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full text-gray-600 py-2 rounded-md border hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
