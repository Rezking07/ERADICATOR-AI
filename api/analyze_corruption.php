<?php
// /api/analyze_corruption.php

function analyzeCorruption($data) {
    $transactions = json_decode($data, true);
    $transactionCount = count($transactions);
    $riskLevel = 'Low';
    $summary = 'No suspicious activity detected.';
    $insights = [];

    if ($transactionCount > 100) {
        $riskLevel = 'High';
        $summary = 'A high number of transactions were detected, which could indicate suspicious activity.';
        $insights[] = [
            'type' => 'High Transaction Volume',
            'details' => "There were {$transactionCount} transactions in the dataset.",
            'recommendation' => 'Review the transactions to ensure they are all legitimate.',
            'potential_loss' => 0,
        ];
    } elseif ($transactionCount > 50) {
        $riskLevel = 'Medium';
        $summary = 'A medium number of transactions were detected.';
        $insights[] = [
            'type' => 'Medium Transaction Volume',
            'details' => "There were {$transactionCount} transactions in the dataset.",
            'recommendation' => 'Review the transactions to ensure they are all legitimate.',
            'potential_loss' => 0,
        ];
    }

    return [
        'risk_level' => $riskLevel,
        'summary' => $summary,
        'insights' => $insights,
    ];
}
?>