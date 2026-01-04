// ===== Imports =====
import React, { useState, useEffect } from "react";
import { Signup } from "../assets/dummystyles";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

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
    if (toast.visible && toast.type === "loading") {
      timer = setTimeout(() => {
        setToast({
          visible: true,
          message: "Account created",
          type: "success",
        });
      }, 2000);
    }

    if (toast.visible && toast.type === "success") {
      timer = setTimeout(() => {
        setToast({ visible: false, message: "", type: "" });
        navigate("/login");
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [toast, navigate]);

  // ===== Handlers =====
  const handleSignUp = (e) => {
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

    setToast({
      visible: true,
      message: "Creating account...",
      type: "loading",
    });
  };

  // ===== JSX =====
  return (
    <div className={Signup.container}>
      {toast.visible && (
        <div
          className={`${Signup.toastBase} ${
            toast.type === "success"
              ? Signup.toastSuccess
              : toast.type === "loading"
              ? "bg-gray-100 text-gray-700"
              : Signup.toastError
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className={Signup.card}>
        <Link to="/login" className={Signup.backLink}>
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="mb-3">
          <div className={Signup.iconContainer}>
            <User
              className="text-white bg-[#368F7A] p-0.5 rounded-full"
              size={20}
            />
          </div>
          <h2 className={Signup.heading}>Create Account</h2>
          <p className={Signup.subtext}>Join Community For Book Lovers</p>
        </div>

        <form className={Signup.form} onSubmit={handleSignUp}>
          <div>
            <label className={Signup.label}>Username</label>
            <div className={Signup.inputWrapper}>
              <User className={Signup.iconLeft} />
              <input
                className={Signup.input}
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className={Signup.label}>Email</label>
            <div className={Signup.inputWrapper}>
              <Mail className={Signup.iconLeft} />
              <input
                className={Signup.input}
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className={Signup.label}>Password</label>
            <div className={Signup.inputWrapper}>
              <Lock className={Signup.iconLeft} />
              <input
                type={showPassword ? "text" : "password"}
                className={Signup.passwordInput}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className={Signup.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <button type="submit" className={Signup.submitBtn}>
            Sign Up
          </button>
        </form>

        <p className={Signup.footerText}>
          Have account?{" "}
          <Link to="/login" className={Signup.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
