import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Edit3, Image as ImageIcon, Type, User, Tag, DollarSign, AlignLeft, ArrowLeft, Save } from "lucide-react";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    author: "",
    genre: "",
    price: "",
    cover_image: "",
    description: "",
  };

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // 🔹 Fetch book details
 useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/books/${id}`);
      setData(res.data);
    } catch (error) {
      toast.error("Failed to load book data 🚨");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchBook();
  }
}, [id]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await axios.put(`http://localhost:5000/books/${id}`, data);
      if (res.status === 200) {
        toast.success("Changes saved successfully! ✅");
        navigate("/");
      }
    } catch (error) {
      toast.error("Update failed ❌");
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-medium">Fetching book records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-28 pb-12 px-6 relative overflow-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 w-fit">
          <ArrowLeft size={18} /> Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* FORM CARD */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-600 rounded-2xl">
                <Edit3 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Update Details</h1>
                <p className="text-gray-400 text-sm">Modify information for "{data.title}"</p>
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
                      value={data.title}
                      onChange={handelChange}
                      className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                      value={data.author}
                      onChange={handelChange}
                      className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                      value={data.genre}
                      onChange={handelChange}
                      className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                      value={data.price}
                      onChange={handelChange}
                      className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                    value={data.cover_image}
                    onChange={handelChange}
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                    rows="4"
                    value={data.description}
                    onChange={handelChange}
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isUpdating ? "bg-gray-600 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
                }`}
              >
                {isUpdating ? "UPDATING RECORDS..." : <><Save size={20} /> SAVE CHANGES</>}
              </button>
            </form>
          </div>

          {/* PREVIEW CARD */}
          <div className="hidden lg:flex flex-col items-center sticky top-32">
            <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em] mb-6">Current Appearance</p>
            
            <div className="w-80 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border border-gray-100">
               <div className="h-96 bg-gray-100 relative overflow-hidden">
                 {data.cover_image ? (
                   <img src={data.cover_image} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" alt="preview" />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                     <ImageIcon size={48} />
                     <span className="text-xs font-bold">No Cover Image</span>
                   </div>
                 )}
                 <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-md">
                   ₹{data.price || "0"}
                 </div>
               </div>
               <div className="p-6">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{data.genre || "N/A"}</span>
                  <h3 className="font-bold text-gray-900 text-xl truncate">{data.title || "Untitled Book"}</h3>
                  <p className="text-sm text-gray-500 mb-4">{data.author || "Unknown Author"}</p>
                  <div className="h-1.5 w-full bg-indigo-50 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-2/3"></div>
                  </div>
               </div>
            </div>
            
            <p className="mt-8 text-gray-500 text-sm italic text-center max-w-xs leading-relaxed">
              "The preview updates instantly as you edit the fields on the left."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;