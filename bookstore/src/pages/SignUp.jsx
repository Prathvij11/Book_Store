import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck, UserCircle } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    id: uuidv4(),
    username: "",
    email: "",
    password: "",
    cnfpaswd: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formdata.password !== formdata.cnfpaswd) {
      toast.error("Passwords do not match! ❌");
      return;
    }

    setLoading(true);
    try {
      // Mocking a slight delay for better UX feel
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await axios.post("http://localhost:5000/users", formdata);
      toast.success("Welcome to the BookStore! 🎉");
      
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic check for password match UI
  const isMatching = formdata.password && formdata.cnfpaswd && formdata.password === formdata.cnfpaswd;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4 py-12">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-lg z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="bg-indigo-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30 shadow-inner">
              <UserPlus className="text-indigo-400" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
            <p className="text-gray-400 text-sm">Join our community of book lovers today.</p>
          </div>

          {/* Role Selection (Keeps UI consistent with Login) */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {["user", "admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormdata({ ...formdata, role })}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                  formdata.role === role
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {role === "user" ? <UserCircle size={14} /> : <ShieldCheck size={14} />}
                {role.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="John Doe"
                  value={formdata.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formdata.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formdata.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 ml-1">Confirm</label>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isMatching ? 'text-green-500' : 'text-gray-500'}`} size={18} />
                <input
                  type="password"
                  name="cnfpaswd"
                  placeholder="••••••••"
                  value={formdata.cnfpaswd}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white/5 border text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-600 ${
                    isMatching ? 'border-green-500/50 focus:ring-green-500' : 'border-white/10 focus:ring-indigo-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] mt-4 ${
              loading 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-indigo-500/25"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Login Footer */}
          <div className="pt-2">
            <p className="text-sm text-center text-gray-400">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors border-b border-transparent hover:border-indigo-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;