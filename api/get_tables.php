<?php
// /api/get_tables.php

require_once 'config.php';
require_once 'connect_db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->host) || !isset($data->username) || !isset($data->password) || !isset($data->database)) {
    json_response(['error' => 'Database credentials are required.'], 400);
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

$conn->close();

json_response($tables, 200);
?>