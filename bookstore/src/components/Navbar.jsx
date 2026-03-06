import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { NavContext } from "../context/NavContext";
import { useCart } from "../context/CartContext"; // Added to show dynamic cart count
import {
  Menu,
  X,
  ShoppingCart,
  LogOut,
  PlusCircle,
  Search,
  BookOpen,
  User as UserIcon,
  Package, // New icon for Orders
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { search, setSearch } = useContext(SearchContext);
  const { isLoggedIn, user, logout } = useContext(NavContext);
  const { cart } = useCart(); // Access cart to show dynamic count
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 useEffect(() => {
  if (isLoggedIn && user?.username) {
    toast.success(`Welcome back, ${user.username}!`);
  }
}, [isLoggedIn, user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activeLink = ({ isActive }) =>
    `relative py-2 px-1 transition-all duration-300 flex items-center gap-2 ${
      isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-3 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg" 
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
            <BookOpen className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 hidden sm:block">
            Book<span className="text-blue-600">Store</span>
          </h1>
        </div>

        {/* SEARCH BAR (DESKTOP) */}
        <div className="flex-1 max-w-md mx-8 hidden md:block relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search thousands of books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all shadow-inner"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={activeLink}>
            Books
          </NavLink>

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="text-gray-600 font-medium hover:text-blue-600">
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
              >
                Join Now
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              
              {/* ACTION ICONS (Dynamic per Role) */}
              <div className="flex items-center gap-5">
                {!isAdmin ? (
                  /* USER: Cart */
                  <NavLink to="/cart" className="p-2 text-gray-500 hover:text-blue-600 relative transition-colors bg-gray-50 rounded-xl">
                    <ShoppingCart size={22} />
                    {cart?.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold animate-in zoom-in">
                        {cart.length}
                      </span>
                    )}
                  </NavLink>
                ) : (
                  /* ADMIN: Add & Orders */
                  <div className="flex items-center gap-3">
                    <NavLink to="/order" className={activeLink} title="View All Orders">
                      <Package size={22} />
                      <span className="text-xs font-bold hidden lg:block">Orders</span>
                    </NavLink>
                    <NavLink to="/addbook" className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-100">
                      <PlusCircle size={18} />
                      <span className="text-xs font-bold">Add Book</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* PROFILE DROPDOWN SIMULATION */}
              <div className="flex items-center gap-3 bg-white border border-gray-100 pl-3 pr-1 py-1 rounded-2xl shadow-sm">
                <div className="text-right">
                  <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {user?.role}
                  </span>
                  <p className="text-sm font-bold text-gray-800 leading-tight mt-1">
                    {user?.username}
                  </p>
                </div>
                <div className="h-10 w-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-500 border border-gray-200">
                   <UserIcon size={20} />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-600 transition-transform active:scale-90"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU (Enhanced with Admin/User Specific Sections) */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-6 flex flex-col gap-5 border-t border-gray-100 pt-6 animate-in slide-in-from-top duration-500">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl"
            />
          </div>

          <NavLink to="/" onClick={() => setIsOpen(false)} className="text-lg font-bold text-gray-800 px-2 flex items-center gap-3">
            <BookOpen size={20} className="text-blue-600" /> Browse Catalog
          </NavLink>

          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-1">Account Dashboard</p>
              <div className="bg-gray-50 p-3 rounded-3xl space-y-3">
                {!isAdmin ? (
                  <NavLink to="/cart" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-gray-700 font-medium px-2 py-1">
                    <span className="flex items-center gap-3"><ShoppingCart size={20} /> My Cart</span>
                    <span className="bg-blue-600 text-white text-[10px] px-2 rounded-full">{cart?.length || 0}</span>
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/order" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-700 font-medium px-2 py-1">
                      <Package size={20} /> View All Orders
                    </NavLink>
                    <NavLink to="/addbook" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-green-600 font-bold px-2 py-1">
                      <PlusCircle size={20} /> Add New Book
                    </NavLink>
                  </>
                )}
                <div className="h-px bg-gray-200"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 text-red-500 font-bold px-2 py-1"
                >
                  <LogOut size={20} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <NavLink to="/login" onClick={() => setIsOpen(false)} className="w-full py-4 text-center font-bold text-gray-600 border border-gray-200 rounded-2xl bg-white shadow-sm">
                Sign In
              </NavLink>
              <NavLink to="/signup" onClick={() => setIsOpen(false)} className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
                Create Free Account
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;