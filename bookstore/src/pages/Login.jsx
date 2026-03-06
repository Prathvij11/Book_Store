import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { NavContext } from "../context/NavContext";
import { User, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(NavContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ username: "", password: "", role: "user" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Updated URL to port 5000 and query string format
      const res = await axios.get(
  `http://localhost:5000/users?username=${data.username}&password=${data.password}&role=${data.role}`
);
      if (res.data.length > 0) {
        login(res.data[0]);
        toast.success("Welcome back! 🎉");
        navigate("/");
      } else {
        toast.error("Invalid credentials ❌");
      }
    } catch (error) {
      toast.error("Server is not responding. Check backend.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="username" type="text" placeholder="Username"
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none"
            onChange={handleChange} required
          />
          <input
            name="password" type="password" placeholder="Password"
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none"
            onChange={handleChange} required
          />
          <select 
            name="role" 
            className="w-full bg-gray-800 border border-white/10 p-3 rounded-xl text-white outline-none"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
            {loading ? "Connecting..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;