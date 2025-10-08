<?php
// /api/getReports.php

require_once 'config.php';

// Pastikan parameter user_id ada
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    json_response(['error' => 'Parameter user_id tidak ditemukan'], 400);
}

$userId = intval($_GET['user_id']);
$conn = connectDB();

// Siapkan query untuk mencegah SQL Injection
$stmt = $conn->prepare("SELECT id, report_name, created_at, status, risk_level FROM reports WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $reports[] = $row;
    }
}

$stmt->close();
$conn->close();

json_response($reports, 200);

?>