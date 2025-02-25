import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function PenerbitForm({ isOpen, onClose, addPublisher, editPublisher, editingPublisher, setEditingPublisher, setPublishers }) {
  const [publisher, setPublisher] = useState({
    id: "",
    nama: "",
    alamat: "",
    kota: "",
    telepon: "",
  });

  useEffect(() => {
    if (editingPublisher) {
      setPublisher(editingPublisher);
    } else {
      setPublisher({ id: "", nama: "", alamat: "", kota: "", telepon: "" });
    }
  }, [editingPublisher]);

  const handleChange = (e) => {
    setPublisher({ ...publisher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingPublisher ? "PUT" : "POST";
      const endpoint = editingPublisher
        ? `http://localhost:5000/api/publishers/${publisher.id}`
        : "http://localhost:5000/api/publishers";

      const response = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publisher),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "ID Penerbit sudah ada!");
      }

      // Refresh daftar penerbit setelah perubahan
      const publishersResponse = await fetch("http://localhost:5000/api/publishers");
      const data = await publishersResponse.json();
      setPublishers(data);

      // Reset form setelah submit
      setPublisher({ id: "", nama: "", alamat: "", kota: "", telepon: "" });
      setEditingPublisher(null);
      onClose();

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: editingPublisher ? 'Penerbit berhasil diupdate!' : 'Penerbit berhasil ditambahkan!'
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error.message || 'Terjadi kesalahan saat menyimpan penerbit.'
      });
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
          {editingPublisher ? "Edit Penerbit" : "Tambah Penerbit"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            placeholder="ID Penerbit"
            value={publisher.id}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="text"
            name="nama"
            placeholder="Nama Penerbit"
            value={publisher.nama}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={publisher.alamat}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="text"
            name="kota"
            placeholder="Kota"
            value={publisher.kota}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />
          <input
            type="text"
            name="telepon"
            placeholder="Telepon"
            value={publisher.telepon}
            onChange={handleChange}
            className="border-2 border-black rounded-full px-4 py-2 w-full max-w-sm"
            required
          />

          <div className="col-span-1 md:col-span-2 flex justify-center mt-3">
            <button
              type="submit"
              className="bg-red-500 text-white font-bold px-6 py-2 rounded-full border-2 border-black w-full max-w-sm"
            >
              {editingPublisher ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PenerbitForm;
