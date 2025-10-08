<?php
// /api/config.php

// 1. PENGATURAN HEADER & CORS
// Mengizinkan aplikasi frontend Anda untuk mengakses API ini
header("Access-Control-Allow-Origin: *"); // Untuk production, ganti '*' dengan domain frontend Anda
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. PENGATURAN KONEKSI DATABASE
define('DB_HOST', 'localhost'); // Biasanya 'localhost' di Hostinger
define('DB_USER', 'u523588119_main_user');      // Ganti dengan username database Anda
define('DB_PASS', '1/t6336qZ');    // Ganti dengan password database Anda
define('DB_NAME', 'u523588119_eradicator_db'); // Ganti dengan nama database Anda

// 3. FUNGSI KONEKSI
function connectDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    // Cek koneksi
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Koneksi Database Gagal: ' . $conn->connect_error]);
        exit();
    }

    return $conn;
}

// 4. FUNGSI UNTUK MENGIRIM RESPON JSON
function json_response($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

?>