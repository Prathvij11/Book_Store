import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, Image as ImageIcon, Type, User, Tag, DollarSign, AlignLeft } from "lucide-react";

const Addbook = () => {
  const initialState = {
    title: "",
    author: "",
    genre: "",
    price: "",
    cover_image: "",
    description: "",
  };

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/books", {
        ...data,
        id: uuidv4(),
      });

      if (res.status === 201) {
        toast.success("Book added to the shelves! 📚");
        setData(initialState);
      }
    } catch (error) {
      toast.error("Failed to add book ❌");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-28 pb-12 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: THE FORM */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <PlusCircle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Add New Book</h1>
              <p className="text-gray-400 text-sm">Fill in the details to update your catalog.</p>
            </div>
          </div>

          <form onSubmit={handelSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Title</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="title"
                    type="text"
                    placeholder="The Great Gatsby"
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={data.title}
                    onChange={handelChange}
                    required
                  />
                </div>
              </div>

              {/* Author */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Author</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="author"
                    type="text"
                    placeholder="F. Scott Fitzgerald"
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={data.author}
                    onChange={handelChange}
                    required
                  />
                </div>
              </div>

              {/* Genre */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Genre</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="genre"
                    type="text"
                    placeholder="Classic Fiction"
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={data.genre}
                    onChange={handelChange}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Price (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="price"
                    type="number"
                    placeholder="499"
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={data.price}
                    onChange={handelChange}
                  />
                </div>
              </div>
            </div>

            {/* Cover Image URL */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Cover Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  name="cover_image"
                  type="url"
                  placeholder="https://images.com/book-cover.jpg"
                  className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={data.cover_image}
                  onChange={handelChange}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-4 text-gray-500" size={18} />
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Tell the readers what this book is about..."
                  className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  value={data.description}
                  onChange={handelChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 ${
                loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
              }`}
            >
              {loading ? "PROCESSING..." : "PUBLISH BOOK"}
            </button>
          </form>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="hidden lg:flex flex-col items-center justify-center sticky top-32">
          <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-6">Live Preview</p>
          
          <div className="w-80 bg-white rounded-[2rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
             <div className="h-96 bg-gray-200 relative">
               {data.cover_image ? (
                 <img src={data.cover_image} className="w-full h-full object-cover" alt="preview" />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                   <ImageIcon size={48} />
                   <span className="text-xs font-bold">Image Preview</span>
                 </div>
               )}
               <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                 ₹{data.price || "0"}
               </div>
             </div>
             <div className="p-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{data.genre || "Genre"}</span>
                <h3 className="font-bold text-gray-900 text-xl truncate">{data.title || "Book Title"}</h3>
                <p className="text-sm text-gray-500 mb-4">{data.author || "Author Name"}</p>
                <div className="h-1 w-full bg-gray-100 rounded-full"></div>
             </div>
          </div>
          
          <p className="mt-8 text-gray-500 text-sm italic text-center max-w-xs">
            "Your book will appear like this in the main store view."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Addbook;