import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import BookForm from "../components/BookForm";
import PenerbitForm from "../components/PenerbitForm";

function Admin() {
    const [books, setBooks] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [editingPublisher, setEditingPublisher] = useState(null);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [isPublisherModalOpen, setIsPublisherModalOpen] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        const fetchPublishers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/publishers');
                const data = await response.json();
                setPublishers(data);
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchBooks();
        fetchPublishers();
    }, []);

    const deleteBook = async (id) => {
        const result = await Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Buku yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' });

                const response = await fetch('http://localhost:5000/api/books');
                const data = await response.json();
                setBooks(data);

                Swal.fire("Terhapus!", "Buku berhasil dihapus.", "success");
            } catch (error) {
                Swal.fire("Error!", "Terjadi kesalahan saat menghapus buku.", "error");
            }
        }
    };

    const deletePublisher = async (id) => {
        const result = await Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Penerbit yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal"
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:5000/api/publishers/${id}`, { method: "DELETE" });

                const response = await fetch('http://localhost:5000/api/publishers');
                const data = await response.json();
                setPublishers(data);

                Swal.fire("Terhapus!", "Penerbit berhasil dihapus.", "success");
            } catch (error) {
                Swal.fire("Error!", "Terjadi kesalahan saat menghapus penerbit.", "error");
            }
        }
    };

    const editPublisher = (publisher) => {
        setEditingPublisher(publisher);
    };

    const openAddBookModal = () => {
        setEditingBook(null);
        setIsBookModalOpen(true);
    };

    const openEditBookModal = (book) => {
        setEditingBook(book);
        setIsBookModalOpen(true);
    };

    const openAddPublisherModal = () => {
        setEditingPublisher(null);
        setIsPublisherModalOpen(true);
    };

    const openEditPublisherModal = (publisher) => {
        setEditingPublisher(publisher);
        setIsPublisherModalOpen(true);
    };

    return (
        <div className="p-10">
            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-3">Buku</h2>
                <button
                    onClick={openAddBookModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-full border-2 border-black"
                >
                    Tambah Buku
                </button>
            </div>

            <BookForm
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                addBook={(book) => setBooks([...books, book])}
                editBook={setEditingBook}
                editingBook={editingBook}
                setEditingBook={setEditingBook}
                publishers={publishers}
                setBooks={setBooks}
            />

            <div className="bg-white border-2 border-black rounded-xl p-5 shadow-lg mt-4 overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[border-b-2 border-black">
                            <th className="p-3 border-r border-black">ID Buku</th>
                            <th className="p-3 border-r border-black">Kategori</th>
                            <th className="p-3 border-r border-black">Nama Buku</th>
                            <th className="p-3 border-r border-black">Harga</th>
                            <th className="p-3 border-r border-black">Stok</th>
                            <th className="p-3 border-r border-black">Penerbit</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id} className="text-center border-t border-black">
                                <td className="p-3 border-r border-black">{book.id}</td>
                                <td className="p-3 border-r border-black">{book.kategori}</td>
                                <td className="p-3 border-r border-black">{book.nama}</td>
                                <td className="p-3 border-r border-black">Rp{book.harga.toLocaleString()}</td>
                                <td className="p-3 border-r border-black">{book.stok}</td>
                                <td className="p-3 border-r border-black">{book.penerbit_nama}</td>
                                <td className="p-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => openEditBookModal(book)}
                                        className="bg-yellow-500 text-black px-3 py-1 rounded-full border-2 border-black"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteBook(book.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-full border-2 border-black"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="my-5 ">
                <h2 className="text-2xl font-bold mb-3">Penerbit</h2>
                <button
                    onClick={openAddPublisherModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-full border-2 border-black"
                >
                    Tambah Penerbit
                </button>
            </div>

            <PenerbitForm
                isOpen={isPublisherModalOpen}
                onClose={() => setIsPublisherModalOpen(false)}
                addPublisher={(publisher) => setPublishers([...publishers, publisher])}
                editPublisher={editPublisher}
                editingPublisher={editingPublisher}
                setEditingPublisher={setEditingPublisher}
                setPublishers={setPublishers}
            />

            <div className="bg-white border-2 border-black rounded-xl p-5 shadow-lg mt-4 overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[border-b-2 border-black">
                            <th className="p-3 border-r border-black">ID Penerbit</th>
                            <th className="p-3 border-r border-black">Nama Penerbit</th>
                            <th className="p-3 border-r border-black">Alamat</th>
                            <th className="p-3 border-r border-black">Kota</th>
                            <th className="p-3 border-r border-black">Telepon</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.map((pub) => (
                            <tr key={pub.id} className="text-center border-t border-black">
                                <td className="p-3 border-r border-black">{pub.id}</td>
                                <td className="p-3 border-r border-black">{pub.nama}</td>
                                <td className="p-3 border-r border-black">{pub.alamat}</td>
                                <td className="p-3 border-r border-black">{pub.kota}</td>
                                <td className="p-3 border-r border-black">{pub.telepon}</td>
                                <td className="p-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => openEditPublisherModal(pub)}
                                        className="bg-yellow-500 text-black px-3 py-1 rounded-full border-2 border-black"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deletePublisher(pub.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-full border-2 border-black"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
