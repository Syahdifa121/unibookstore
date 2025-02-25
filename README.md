# UNIBOOKSTORE

Aplikasi manajemen toko buku sederhana menggunakan React.js dan MySQL.

## Teknologi yang Digunakan

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express
- Database: MySQL

## Persyaratan Sistem

- Node.js
- MySQL
- npm atau yarn

## Cara Instalasi

1. Clone repository ini

2. Install dependencies

3. Setup Database
- Buat database MySQL baru
- Import file `database/schema.sql` ke MySQL untuk membuat struktur database dan data awal
- Buat file `.env` di root project dan isi dengan konfigurasi berikut:

4. Jalankan aplikasi

## Fitur Aplikasi

### Admin Panel
- Manajemen data buku (tambah, edit, hapus)
- Manajemen data penerbit (tambah, edit, hapus)
- Validasi input data
- Modal form untuk tambah/edit data
- Konfirmasi hapus data

### Home Page
- Tampilan daftar buku
- Pencarian buku berdasarkan nama/kategori
- Filter buku berdasarkan kategori
- Informasi detail buku dan penerbit

## Struktur Database

### Tabel `penerbit`
- id (VARCHAR)
- nama (VARCHAR)
- alamat (VARCHAR)
- kota (VARCHAR)
- telepon (VARCHAR)

### Tabel `buku`
- id (VARCHAR)
- kategori (VARCHAR)
- nama (VARCHAR)
- harga (INT)
- stok (INT)
- penerbit (VARCHAR) - Foreign Key ke tabel penerbit

Data awal sudah tersedia di file `database/schema.sql`

## Kontributor
- [Nama Anda]

## Lisensi
MIT License