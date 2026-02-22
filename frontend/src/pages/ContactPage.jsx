import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return <div>
    <Navbar />
    <Contact />
    <Footer />
  </div>;
};

export default ContactPage;
