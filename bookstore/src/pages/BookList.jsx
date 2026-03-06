import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import BookCard from "../components/BookCard";
import BookModal from '../components/BookModal'
import toast from "react-hot-toast";
import { Sparkles, Library, SearchX } from "lucide-react";


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { search } = useContext(SearchContext);
  const { addToCart } = useCart();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/books");
        setBooks(res.data);
      } catch (err) {
        toast.error("Failed to load books from server",err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const openModal = (book) => {
    // CRITICAL: Map MongoDB _id to id property for the frontend
    setSelectedBook({ ...book, id: book._id });
    setQty(1);
  };

  const closeModal = () => setSelectedBook(null);

  const handleAddToCart = async () => {
    await addToCart(selectedBook, qty);
    toast.success(`${selectedBook.title} added to cart! 🛒`);
    closeModal();
  };

  const handelDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
      toast.success("Book removed 🗑️");
    } catch (error) {
      toast.error("Delete failed");
      console.log(error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="pt-40 text-center text-white">Loading Library...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-28">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            <Library className="text-blue-600" /> Explore Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onOpen={openModal} onDelete={handelDelete} />
          ))}
        </div>
      </div>

      <BookModal book={selectedBook} qty={qty} setQty={setQty} onClose={closeModal} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default BookList;