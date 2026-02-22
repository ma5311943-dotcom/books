import React from "react";
import { footerStyles as styles } from "../assets/dummystyles";
import { Link } from "react-router-dom";
import logo from "../assets/logoicon.png";
import { quickLinks, socialLinks } from "../assets/dummydata";
import { ArrowRight, Mail, MapPin, Phone, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-[#43C6AC] to-[#2B5876]"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <img src={logo} className="h-8 w-8 object-contain" alt="Logo" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">BOOK<span className="text-[#43C6AC]">SHELL</span></h1>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Your premier destination for literary discovery. We curate the finest collection of stories to inspire and transform your reading journey.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#43C6AC] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-8 border-l-4 border-[#43C6AC] pl-4">Navigation</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.url} className="text-gray-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#43C6AC] transition-all"></span>
                    {link.title}
                  </Link>
                </li>
              ))}
              {/* Added missing links */}
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#43C6AC] transition-all"></span>My Account</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#43C6AC] transition-all"></span>Track Orders</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-8 border-l-4 border-[#43C6AC] pl-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-6 font-medium">Get literary tips and new arrivals directly in your inbox.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-800 border-0 rounded-2xl py-4 pl-6 pr-14 text-white text-sm focus:ring-2 focus:ring-[#43C6AC]/30 outline-none transition-all placeholder-gray-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#43C6AC] rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-8 border-l-4 border-[#43C6AC] pl-4">Get in Touch</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <div className="bg-gray-800 p-2 rounded-lg text-[#43C6AC] mt-0.5"><MapPin size={16} /></div>
                <span className="font-medium">123 BookStreet, Reading City, RC 45678</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <div className="bg-gray-800 p-2 rounded-lg text-[#43C6AC]"><Mail size={16} /></div>
                <span className="font-medium underline decoration-[#43C6AC]">contact@bookshell.com</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-sm">
                <div className="bg-gray-800 p-2 rounded-lg text-[#43C6AC]"><Phone size={16} /></div>
                <span className="font-semibold">+92 (308) 918-3548</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BookShell Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-xs font-semibold uppercase tracking-widest">
            MADE WITH <Heart size={14} className="text-red-500 fill-red-500 animate-pulse mx-1" /> BY ILYAS
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
