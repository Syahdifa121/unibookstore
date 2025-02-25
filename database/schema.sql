CREATE DATABASE IF NOT EXISTS unibookstore;
USE unibookstore;

DROP TABLE IF EXISTS buku;
DROP TABLE IF EXISTS penerbit;

CREATE TABLE penerbit (
    id VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat VARCHAR(100) NOT NULL,
    kota VARCHAR(50) NOT NULL,
    telepon VARCHAR(20) NOT NULL
);

CREATE TABLE buku (
    id VARCHAR(10) PRIMARY KEY,
    kategori VARCHAR(50) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    harga INT NOT NULL CHECK (harga >= 0),
    stok INT NOT NULL CHECK (stok >= 0),
    penerbit VARCHAR(10),
    FOREIGN KEY (penerbit) REFERENCES penerbit(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO penerbit (id, nama, alamat, kota, telepon) VALUES
('SP01', 'Penerbit Informatika', 'Jl. Buah Batu No. 121', 'Bandung', '0813-2220-1946'),
('SP02', 'Andi Offset', 'Jl. Suryalaya IX No.3', 'Bandung', '0878-3903-0688'),
('SP03', 'Danendra', 'Jl Moch. Toha 44', 'Bandung', '022-5201215');

INSERT INTO buku (id, kategori, nama, harga, stok, penerbit) VALUES
('K1001', 'Keilmuan', 'Analisis & Perancangan Sistem Informasi', 50000, 60, 'SP01'),
('K1002', 'Keilmuan', 'Artificial Intelligence', 45000, 60, 'SP01'),
('K2003', 'Keilmuan', 'Autocad 3 Dimensi', 40000, 25, 'SP01'),
('B1001', 'Bisnis', 'Bisnis Online', 75000, 9, 'SP01'),
('K3004', 'Keilmuan', 'Cloud Computing Technology', 85000, 15, 'SP01'),
('B1002', 'Bisnis', 'Etika Bisnis dan Tanggung Jawab Sosial', 67500, 20, 'SP01'),
('N1001', 'Novel', 'Cahaya Di Penjuru Hati', 68000, 10, 'SP02'),
('N1002', 'Novel', 'Aku Ingin Cerita', 48000, 12, 'SP03'); 