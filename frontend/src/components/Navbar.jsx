// ===== Imports =====
import React, { useEffect, useState } from "react";
import { navbarStyles } from "../assets/dummystyles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoicon.png";
import { navItems } from "../assets/dummydata";
import { FaOpencart } from "react-icons/fa";
import { MenuIcon, User, X, LogOut, Settings, Package, LayoutDashboard } from "lucide-react";
import { useCart } from "../cartContext/CartContext";
import { useAuth } from "../context/AuthContext";

// ===== Navbar Component =====
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalQuantity = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // ===== Scroll Effect =====
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`${navbarStyles.nav(scrolled)} transition-all duration-500 ${scrolled ? 'py-3 shadow-lg shadow-gray-200/20' : 'py-6'}`}>
        <div className={navbarStyles.container}>
          <div className="flex items-center justify-between">

            {/* ===== Logo ===== */}
            <Link to="/" className={navbarStyles.logoContainer} onClick={() => window.scrollTo(0, 0)}>
              <div className="relative group">
                <div className={navbarStyles.logoGradient} />
                <div className="flex relative items-center">
                  <div className="bg-white p-1.5 rounded-xl shadow-sm border border-emerald-50 group-hover:rotate-12 transition-transform duration-500">
                    <img className="h-7 w-7 md:h-8 md:w-8 object-contain" src={logo} alt="Logo" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl md:text-2xl font-semibold tracking-tighter text-gray-900 leading-none">BOOK<span className="text-[#43C6AC]">SHELL</span></h1>
                    <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-gray-400 mt-0.5">Premium Library</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* ===== Desktop Nav Items ===== */}
            <div className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white shadow-sm">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                      ? 'bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white shadow-lg shadow-emerald-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* ===== Right Icons ===== */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link to="/cart" className="relative group p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <FaOpencart className="h-6 w-6 text-gray-700 group-hover:text-[#43C6AC] transition-colors" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 pl-3 pr-2 py-1.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="hidden md:block text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#43C6AC]">Hello,</p>
                      <p className="text-xs font-semibold text-gray-900 truncate w-20">{user.username}</p>
                    </div>
                    <div className="h-9 w-9 bg-gradient-to-br from-[#43C6AC] to-[#2B5876] rounded-xl flex items-center justify-center text-white shadow-sm">
                      <User size={20} />
                    </div>
                  </button>

                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50 py-3 animate-in fade-in slide-in-from-top-5 duration-300">
                      <div className="px-6 py-4 border-b border-gray-50 mb-2">
                        <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-400 font-medium truncate">{user.email}</p>
                      </div>

                      <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#43C6AC] transition-all group">
                        <Settings size={18} className="group-hover:rotate-45 transition-transform" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Profile Settings</span>
                      </Link>

                      <Link to="/orders" onClick={() => setShowUserMenu(false)} className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#43C6AC] transition-all">
                        <Package size={18} />
                        <span className="text-xs font-semibold uppercase tracking-widest">My Purchase</span>
                      </Link>

                      {user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-4 px-6 py-3 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 transition-all border-y border-indigo-50 my-1">
                          <LayoutDashboard size={18} />
                          <span className="text-xs font-semibold uppercase tracking-widest">Admin Panel</span>
                        </Link>
                      )}

                      <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 transition-all text-left">
                        <LogOut size={18} />
                        <span className="text-xs font-semibold uppercase tracking-widest">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-6 py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-2xl text-xs font-semibold uppercase tracking-widest shadow-lg shadow-emerald-100 hover:scale-105 active:scale-95 transition-all">
                  Login
                </Link>
              )}

              {/* Mobile Toggle */}
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {isOpen ? <X size={24} className="text-gray-900" /> : <MenuIcon size={24} className="text-gray-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-[88px] bg-white/95 backdrop-blur-xl z-40 p-6 animate-in slide-in-from-right duration-500">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">{item.name}</span>
                  <ChevronRight size={18} className="text-[#43C6AC]" />
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-5 bg-indigo-50 rounded-2xl border border-indigo-100"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">Admin Dashboard</span>
                  <LayoutDashboard size={18} className="text-indigo-700" />
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* User Menu Overlay */}
      {showUserMenu && <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />}
    </>
  );
};

export default Navbar;
