import React, { useState } from "react";
import BookList from "../components/BookList";
import { Link } from "react-router-dom";

function Home({ books, publishers }) {
    const [search, setSearch] = useState("");

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 p-10" >
               <div className="mb-5 flex justify-center w-full">
                    <input
                        type="text"
                        placeholder="Cari Nama Buku.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-4 w-full rounded-full shadow-md bg-white text-black text-lg"
                    />
                </div>
                <BookList books={books.filter((book) => book.nama.toLowerCase().includes(search.toLowerCase()))} publishers={publishers} />
            </div>
        </div>
    );
}

export default Home;
    