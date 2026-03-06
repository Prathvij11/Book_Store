import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  BookOpen 
} from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email");
    
    toast.success("Thanks for subscribing! 📚");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: BRAND & MISSION */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <BookOpen className="text-blue-500" /> BookStore
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Your gateway to thousands of worlds. We provide the best collection 
              of literature, technical guides, and rare finds since 2024.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <NavLink to="/" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">
                  Browse Catalog
                </NavLink>
              </li>
              <li>
                <NavLink to="/addbook" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">
                  Sell Your Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">
                  View Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">
                  Account Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT INFO */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-500 shrink-0" />
                <span>123 Bookworm Lane, Library District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>+1 (555) 000-BOOK</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>support@bookstore.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Weekly Reads</h3>
            <p className="text-sm mb-4 text-gray-400">Get updates on new arrivals and monthly bestsellers.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BookStore Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;