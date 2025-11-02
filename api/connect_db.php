<?php
// /api/connect_db.php

function connectToUserDb($host, $username, $password, $database) {
    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        return null;
    }

    return $conn;
}
?>