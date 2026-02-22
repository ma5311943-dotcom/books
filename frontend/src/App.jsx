// ===== Imports =====
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddBooks from "./pages/Admin/AddBooks";
import ListBooks from "./pages/Admin/ListBooks";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers";
import Checkout from "./components/Checkout/Checkout";
import VerifyOrder from "./pages/VerifyOrder";
import MyOrders from "./pages/Orders/MyOrders";
import ProfilePage from "./pages/ProfilePage";

// ===== App =====
const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User Protected Routes */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/verify" element={<VerifyOrder />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-books" element={<AddBooks />} />
          <Route path="list-books" element={<ListBooks />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
