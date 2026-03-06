import React, { useContext } from "react";
import { NavContext } from "../context/NavContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Edit3, Trash2, BookOpen, Star } from "lucide-react";

const BookCard = ({ book, onOpen, onDelete }) => {
  const { user, isLoggedIn } = useContext(NavContext);
  const isAdmin = user?.role === "admin";

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      
      {/* IMAGE CONTAINER */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img
          src={book.cover_image}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* OVERLAY ON HOVER */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* PRICE TAG (Floating) */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
          <p className="font-bold text-indigo-600 text-sm">₹{book.price}</p>
        </div>

        {/* ➕ QUICK ADD TO CART (USER ONLY) */}
        {!isAdmin && isLoggedIn && (
          <button
            onClick={() => onOpen(book)}
            className="absolute -bottom-12 group-hover:bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all duration-300 transform"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            {book.genre || "General"}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold text-gray-600">4.5</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-lg leading-tight truncate group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 mb-4 flex items-center gap-1">
          <BookOpen size={14} className="text-gray-400" /> {book.author}
        </p>

        {/* 🔐 ADMIN CONTROLS */}
        {isAdmin ? (
          <div className="flex gap-2 pt-2 border-t border-gray-50">
            <Link
              to={`/update/${book._id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
            >
              <Edit3 size={14} /> Edit
            </Link>

            <button
              onClick={() => onDelete(book._id)}
              className="px-3 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
              title="Delete Book"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
             
            <span className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-full">
              In Stock
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;