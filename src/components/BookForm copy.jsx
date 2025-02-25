import React, { useState, useEffect } from "react";

function BookForm({ isOpen, onClose, addBook, editBook, editingBook, setEditingBook, publishers, setBooks }) {
  const [book, setBook] = useState({
    id: "",
    kategori: "",
    nama: "",
    harga: "",
    stok: "",
    penerbit: "",
  });

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
    } else {
      setBook({ id: "", kategori: "", nama: "", harga: "", stok: "", penerbit: "" });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingBook ? "PUT" : "POST";
      const endpoint = editingBook
        ? `http://localhost:5000/api/books/${book.id}`
        : "http://localhost:5000/api/books";

      await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();
      setBooks(data); 

      setBook({ id: "", kategori: "", nama: "", harga: "", stok: "", penerbit: "" });
      setEditingBook(null);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-center mb-4">
          {editingBook ? "Edit Buku" : "Tambah Buku"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            placeholder="ID Buku"
            value={book.id}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="text"
            name="kategori"
            placeholder="Kategori"
            value={book.kategori}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="text"
            name="nama"
            placeholder="Nama Buku"
            value={book.nama}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="number"
            name="harga"
            placeholder="Harga"
            value={book.harga}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="number"
            name="stok"
            placeholder="Stok"
            value={book.stok}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />

          <select
            name="penerbit"
            value={book.penerbit}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm appearance-none"
            required
          >
            <option value="">Pilih Penerbit</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.nama}
              </option>
            ))}
          </select>

          <div className="col-span-1 md:col-span-2 flex justify-center mt-3">
            <button
              type="submit"
              className="bg-red-500 text-white font-bold px-6 py-2 rounded-full border-2 border-black w-full max-w-sm"
            >
              {editingBook ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
