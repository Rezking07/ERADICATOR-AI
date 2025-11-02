-- /api/schema.sql

CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `report_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Completed','In Progress','Failed') NOT NULL DEFAULT 'In Progress',
  `risk_level` enum('Low','Medium','High') DEFAULT NULL,
  `analysis_result` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contoh data (opsional)
INSERT INTO `reports` (`user_id`, `report_name`, `status`, `risk_level`) VALUES
(1, 'Analisis Proyek Jembatan 2023', 'Completed', 'High'),
(1, 'RAB Gedung Sekolah', 'Completed', NULL);