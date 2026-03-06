import React from "react";
import { X, ShoppingCart, Plus, Minus, Star, BookOpen } from "lucide-react";

const BookModal = ({ book, qty, setQty, onClose, onAddToCart }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      
      {/* Container */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-500 hover:text-red-500 hover:rotate-90 transition-all shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image Gallery Style */}
        <div className="md:w-1/2 bg-gray-50 relative group">
          <img
            src={book.cover_image}
            alt={book.title}
            className="h-64 md:h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-blue-600 shadow-sm">
              {book.genre}
            </span>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
            ))}
            <span className="text-xs font-bold text-gray-400 ml-1">(4.8 / 5)</span>
          </div>

          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-1">
            {book.title}
          </h2>
          <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-blue-500" />
            by <span className="text-blue-600 italic underline cursor-pointer">{book.author}</span>
          </p>

          <div className="flex-1 overflow-y-auto max-h-32 mb-6 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            <p className="text-sm leading-relaxed text-gray-600">
              {book.description || "Indulge in this captivating masterpiece that explores deep themes and unforgettable characters. A must-have for every collector."}
            </p>
          </div>

          {/* Pricing & Qty */}
          <div className="flex items-end justify-between mb-8 border-t border-gray-100 pt-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Price</p>
              <p className="text-3xl font-black text-gray-900">₹{book.price}</p>
            </div>

            <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="p-2 hover:bg-white hover:text-blue-600 rounded-xl transition-all hover:shadow-sm"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 font-black text-gray-800 text-lg min-w-[40px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-2 hover:bg-white hover:text-blue-600 rounded-xl transition-all hover:shadow-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={onAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
          >
            <ShoppingCart size={20} />
            Add to Bag — ₹{book.price * qty}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;