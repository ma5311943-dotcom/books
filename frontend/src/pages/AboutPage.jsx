import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div>
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
