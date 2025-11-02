<?php
// /api/get_table_data.php

require_once 'config.php';
require_once 'connect_db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->host) || !isset($data->username) || !isset($data->password) || !isset($data->database) || !isset($data->table)) {
    json_response(['error' => 'Database credentials and table name are required.'], 400);
}

$conn = connectToUserDb($data->host, $data->username, $data->password, $data->database);

if (!$conn) {
    json_response(['error' => 'Failed to connect to the database.'], 500);
}

$result = $conn->query("SHOW TABLES");

$tables = [];
while ($row = $result->fetch_row()) {
    $tables[] = $row[0];
}

if (!in_array($data->table, $tables)) {
    json_response(['error' => 'Invalid table name.'], 400);
}

$stmt = $conn->prepare("SELECT * FROM `" . $data->table . "`");
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$conn->close();

json_response($data, 200);
?>