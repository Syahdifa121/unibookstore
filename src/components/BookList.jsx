import React from "react";

function BookList({ books, publishers }) {
    const getPublisherName = (publisherId) => {
        const publisher = publishers.find(p => p.id === publisherId);
        return publisher ? publisher.nama : publisherId;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {books.length > 0 ? (
                books.map((book) => (
                    <div 
                        key={book.id} 
                        className="bg-white border-2 border-black rounded-3xl shadow-md hover:shadow-xl transition duration-300 ease-in-out p-5 flex flex-col items-center"
                    >
                        <img
                            src="\book.png"
                            alt={book.nama}
                            className="w-full h-full object-cover rounded-xl mb-4"
                        />
                        <div className="text-left w-full">
                            <h3 className="font-bold text-lg text-black mb-1">{book.nama}</h3>
                            <p className="text-sm font-semibold text-red-500">{book.kategori}</p>
                            <p className="text-sm text-gray-500">Penerbit: {getPublisherName(book.penerbit)}</p>
                            <p className="text-xl font-bold text-black mt-3">Rp{book.harga.toLocaleString()}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500">Buku tidak ditemukan</div>
            )}
        </div>
    );
}

export default BookList;
