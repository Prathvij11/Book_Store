import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Package, Calendar, DollarSign, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const Order = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let res = await axios.get("http://localhost:5000/payments");
        // Sorting by date to show latest orders first
        const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <Package className="text-blue-600" size={32} /> My Orders
            </h1>
            <p className="text-gray-500 mt-1">Track and manage your recent book purchases.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 text-sm font-bold text-gray-600">
            Total Orders: {data.length}
          </div>
        </div>

        {data.length > 0 ? (
          <div className="space-y-6">
            {data.map((order) => (
              <div 
                key={order.id || order.paymentId} 
                className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Left: Basic Info */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</p>
                      <h2 className="text-lg font-bold text-gray-800 break-all">{order.paymentId}</h2>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Status Badge */}
                  <div className="flex md:justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
                      order.status === 'success' 
                      ? 'bg-green-50 text-green-600 border border-green-100' 
                      : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                    }`}>
                      <div className={`h-2 w-2 rounded-full ${order.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                      {order.status}
                    </span>
                  </div>

                  {/* Right: Amount & Action */}
                  <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Paid</p>
                      <p className="text-2xl font-black text-blue-600 flex items-center justify-end">
                        <DollarSign size={20} />{order.amount}
                      </p>
                    </div>
                    
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
            <p className="text-gray-500 mt-2 mb-8">Items you purchase will appear here.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Start Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Order;