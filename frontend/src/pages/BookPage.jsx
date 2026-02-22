import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import Footer from "../components/Footer";

const BookPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return <>
    <div>
      <Navbar />
      <Books />
      <Footer />
    </div></>
};

export default BookPage;
