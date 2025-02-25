import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Pengadaan from "./components/Pengadaan";

function App() {
  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error Fetching Books:", err));
  
    fetch("http://localhost:5000/api/publishers")
      .then((res) => res.json())
      .then((data) => setPublishers(data))
      .catch((err) => console.error("Error Fetching Publishers:", err));
  }, []);
  
  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const editBook = (updatedBook) => {
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#FFE6AC]">
        <button 
          className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-gray-800 text-white"
          onClick={toggleSidebar}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`
          fixed md:static 
          w-64 md:w-1/7 
          bg-white
          p-5 
          pt-16 md:pt-5  {/*Mobile */}
          shadow-lg 
          min-h-screen
          transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          z-10
        `}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-gray-800">Uni</span>
              <span className="text-[#FF751C]">bookstore</span>
              <span className="text-[#FF751C]">.</span>
            </h2>
          </div>

          <nav className="space-y-3 pt-20">
            <Link 
              to="/" 
              className="block text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/admin" 
              className="block text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              Admin
            </Link>
            <Link 
              to="/pengadaan" 
              className="block text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              Pengadaan
            </Link>
          </nav>
        </div>

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-5"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          <Routes>
            <Route path="/" element={<Home books={books} publishers={publishers} />} />
            <Route path="/admin" element={<Admin books={books} publishers={publishers} addBook={addBook} deleteBook={deleteBook} editBook={editBook} />} />
            <Route path="/pengadaan" element={<Pengadaan books={books} />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
