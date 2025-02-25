const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware untuk parsing JSON

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",   // Ganti dengan username MySQL kamu
  password: "",   // Ganti dengan password MySQL kamu
  database: "unibookstore",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// 🟢 **GET semua penerbit**
app.get("/api/publishers", (req, res) => {
  const sql = "SELECT * FROM penerbit";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔴 **POST (Tambah) penerbit**
app.post("/api/publishers", (req, res) => {
  const { id, nama, alamat, kota, telepon } = req.body;
  const sql = "INSERT INTO penerbit (id, nama, alamat, kota, telepon) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [id, nama, alamat, kota, telepon], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Penerbit ditambahkan" });
  });
});

// 🟡 **PUT (Edit) penerbit**
app.put("/api/publishers/:id", (req, res) => {
  const { nama, alamat, kota, telepon } = req.body;
  const sql = "UPDATE penerbit SET nama=?, alamat=?, kota=?, telepon=? WHERE id=?";
  db.query(sql, [nama, alamat, kota, telepon, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Penerbit diperbarui" });
  });
});

// 🔵 **DELETE penerbit**
app.delete("/api/publishers/:id", (req, res) => {
  const sql = "DELETE FROM penerbit WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Penerbit dihapus" });
  });
});

// 🟢 **GET semua buku**
app.get("/api/books", (req, res) => {
  const sql = "SELECT buku.*, penerbit.nama AS penerbit_nama FROM buku JOIN penerbit ON buku.penerbit = penerbit.id";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔴 **POST (Tambah) buku**
app.post("/api/books", (req, res) => {
  const { id, kategori, nama, harga, stok, penerbit } = req.body;
  const sql = "INSERT INTO buku (id, kategori, nama, harga, stok, penerbit) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [id, kategori, nama, harga, stok, penerbit], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Buku ditambahkan" });
  });
});

// 🟡 **PUT (Edit) buku**
app.put("/api/books/:id", (req, res) => {
  const { kategori, nama, harga, stok, penerbit } = req.body;
  const sql = "UPDATE buku SET kategori=?, nama=?, harga=?, stok=?, penerbit=? WHERE id=?";
  db.query(sql, [kategori, nama, harga, stok, penerbit, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Buku diperbarui" });
  });
});

// 🔵 **DELETE buku**
app.delete("/api/books/:id", (req, res) => {
  const sql = "DELETE FROM buku WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Buku dihapus" });
  });
});

// Jalankan server di port 5000
app.listen(5000, () => {
  console.log("Server berjalan di port 5000");
});
