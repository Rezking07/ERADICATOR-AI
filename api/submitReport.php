<?php
// /api/submitReport.php

require_once 'config.php';

// Ambil data JSON dari request body
$data = json_decode(file_get_contents("php://input"));

// Validasi data input
if (!$data || !isset($data->user_id) || !isset($data->report_name) || !isset($data->file_content)) {
    json_response(['error' => 'Data tidak lengkap. Pastikan user_id, report_name, dan file_content ada.'], 400);
}

$userId = intval($data->user_id);
$reportName = filter_var($data->report_name, FILTER_SANITIZE_STRING);
$fileContent = $data->file_content; // Di dunia nyata, ini perlu di-sanitize lebih lanjut

// Di sini Anda akan memanggil Gemini API untuk analisis
// Untuk saat ini, kita akan gunakan status 'In Progress' dan risk_level 'Medium' sebagai placeholder
$status = 'In Progress';
$riskLevel = 'Medium'; // Ini akan di-update oleh proses analisis AI

$conn = connectDB();

$stmt = $conn->prepare("INSERT INTO reports (user_id, report_name, status, risk_level) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $userId, $reportName, $status, $riskLevel);

if ($stmt->execute()) {
    $reportId = $stmt->insert_id;
    json_response([
        'success' => true,
        'message' => 'Laporan berhasil dikirim dan sedang dianalisis.',
        'report_id' => $reportId
    ], 201);
} else {
    json_response(['error' => 'Gagal menyimpan laporan ke database.'], 500);
}

$stmt->close();
$conn->close();

?>