import React from "react";

function Pengadaan({ books }) {
  const lowStockBooks = books.filter((book) => Number(book.stok) < 25);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Daftar Buku dengan Stok Rendah</h2>
      {lowStockBooks.length === 0 ? (
        <p className="text-gray-500 text-center">✅ Semua buku memiliki stok cukup.</p>
      ) : (
        <div className="bg-white border-2 border-black rounded-xl p-5 shadow-lg mt-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 border-r border-black">ID Buku</th>
                <th className="p-3 border-r border-black">Nama Buku</th>
                <th className="p-3 border-r border-black">Kategori</th>
                <th className="p-3 border-r border-black">Harga</th>
                <th className="p-3 border-r border-black">Penerbit</th>
                <th className="p-3 border-black">Stok</th>
              </tr>
            </thead>
            <tbody>
              {lowStockBooks.map((book) => (
                <tr key={book.id} className="text-center border-t border-black">
                  <td className="p-3 border-r border-black">{book.id}</td>
                  <td className="p-3 border-r border-black">{book.nama}</td>
                  <td className="p-3 border-r border-black">{book.kategori}</td>
                  <td className="p-3 border-r border-black">Rp{book.harga.toLocaleString()}</td>
                  <td className="p-3 border-r border-black">{book.penerbit}</td>
                  <td className="p-3 font-bold text-red-600 border-black">{book.stok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Pengadaan;
