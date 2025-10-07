

import { User, Role, FinancialReport, AnalysisStatus, DetectionResult, SeverityLevel, MarketPrice, Article, ArticleStatus, ActivityLogItem, RabProject, RabItem } from '../types';

export const mockUsers: User[] = [
  { id: 1, email: 'admin@eradicator.id', fullName: 'Admin Utama', role: Role.ADMIN, createdAt: '2023-01-15T09:30:00Z', lastLogin: '2024-07-30T14:00:00Z' },
  { id: 2, email: 'budi.hartono@dinas.go.id', fullName: 'Budi Hartono', role: Role.USER, createdAt: '2023-02-20T11:00:00Z', lastLogin: '2024-07-28T18:45:00Z' },
  { id: 3, email: 'siti.rahayu@pemda.co.id', fullName: 'Siti Rahayu', role: Role.USER, createdAt: '2023-03-10T14:20:00Z', lastLogin: '2024-07-29T08:10:00Z' },
  { id: 4, email: 'agus.wijaya@kementrian.net', fullName: 'Agus Wijaya', role: Role.USER, createdAt: '2023-05-01T08:00:00Z', lastLogin: '2024-07-25T11:30:00Z' },
  { id: 5, email: 'dewi.lestari@bumn.go.id', fullName: 'Dewi Lestari', role: Role.USER, createdAt: '2023-06-15T10:00:00Z', lastLogin: '2024-07-30T09:00:00Z' },
  { id: 6, email: 'eko.prasetyo@swasta.com', fullName: 'Eko Prasetyo', role: Role.USER, createdAt: '2023-07-21T13:30:00Z', lastLogin: '2024-07-29T17:20:00Z' },
  { id: 7, email: 'rudi.santoso@pemkot.go.id', fullName: 'Rudi Santoso', role: Role.USER, createdAt: '2023-08-01T16:00:00Z', lastLogin: '2024-07-28T10:00:00Z' },
  { id: 8, email: 'indah.cahyani@dpr.go.id', fullName: 'Indah Cahyani', role: Role.USER, createdAt: '2023-09-05T11:45:00Z', lastLogin: '2024-07-30T11:15:00Z' },
  { id: 9, email: 'joni.iskandar@inspektorat.id', fullName: 'Joni Iskandar', role: Role.USER, createdAt: '2023-10-10T09:15:00Z', lastLogin: '2024-07-27T14:50:00Z' },
  { id: 10, email: 'putri.wulandari@bps.go.id', fullName: 'Putri Wulandari', role: Role.USER, createdAt: '2023-11-12T14:00:00Z', lastLogin: '2024-07-30T13:05:00Z' },
];

export const mockFinancialReports: FinancialReport[] = [
  { id: 101, userId: 2, originalFilename: 'Laporan_Q1_2024.xlsx', analysisStatus: AnalysisStatus.COMPLETED, uploadTimestamp: '2024-04-05T10:00:00Z', detectionCount: 3 },
  { id: 102, userId: 3, originalFilename: 'Anggaran_Proyek_Jalan.pdf', analysisStatus: AnalysisStatus.COMPLETED, uploadTimestamp: '2024-05-12T15:30:00Z', detectionCount: 1 },
  { id: 103, userId: 2, originalFilename: 'Realisasi_Dana_Bansos.csv', analysisStatus: AnalysisStatus.PROCESSING, uploadTimestamp: '2024-07-28T09:00:00Z', detectionCount: 0 },
  { id: 104, userId: 4, originalFilename: 'LPJ_Kegiatan_Sosial.xlsx', analysisStatus: AnalysisStatus.PENDING, uploadTimestamp: '2024-07-29T11:45:00Z', detectionCount: 0 },
  { id: 105, userId: 3, originalFilename: 'Pembelian_ATK_Juni.xlsx', analysisStatus: AnalysisStatus.ERROR, uploadTimestamp: '2024-06-20T13:00:00Z', detectionCount: 0 },
  { id: 106, userId: 5, originalFilename: 'Laporan_Keuangan_Semester1.pdf', analysisStatus: AnalysisStatus.COMPLETED, uploadTimestamp: '2024-07-15T14:20:00Z', detectionCount: 0 },
  { id: 107, userId: 6, originalFilename: 'Audit_Internal_Q2.xlsx', analysisStatus: AnalysisStatus.COMPLETED, uploadTimestamp: '2024-07-18T11:00:00Z', detectionCount: 5 },
  { id: 108, userId: 7, originalFilename: 'Pengadaan_Barang_2024.csv', analysisStatus: AnalysisStatus.PENDING, uploadTimestamp: '2024-07-30T10:30:00Z', detectionCount: 0 },
];

export const mockDetectionResults: DetectionResult[] = [
  { id: 201, reportId: 101, anomalyType: 'Penggelembungan Harga', severityLevel: SeverityLevel.TINGGI, description: 'Harga pembelian laptop melebihi harga pasar rata-rata sebesar 35%.', offendingData: { item: 'Laptop Spek Tinggi', reported_price: 27000000, market_price: 20000000 }, detectedAt: '2024-04-05T10:05:00Z' },
  { id: 202, reportId: 101, anomalyType: 'Transaksi Fiktif', severityLevel: SeverityLevel.KRITIS, description: 'Ditemukan pembayaran untuk vendor "Maju Mundur Jaya" yang tidak terdaftar di sistem rekanan.', offendingData: { vendor: 'Maju Mundur Jaya', amount: 50000000, date: '2024-03-15' }, detectedAt: '2024-04-05T10:06:00Z' },
  { id: 203, reportId: 101, anomalyType: 'Duplikasi Pembayaran', severityLevel: SeverityLevel.SEDANG, description: 'Invoice #INV-12345 dibayarkan dua kali pada tanggal yang berbeda.', offendingData: { invoice: '#INV-12345', amount: 15000000, dates: ['2024-02-10', '2024-02-28'] }, detectedAt: '2024-04-05T10:07:00Z' },
  { id: 204, reportId: 102, anomalyType: 'Ketidaksesuaian Volume', severityLevel: SeverityLevel.RENDAH, description: 'Volume aspal yang dilaporkan (100 ton) tidak sesuai dengan panjang jalan yang dikerjakan (estimasi kebutuhan 95 ton).', offendingData: { item: 'Aspal Hotmix', reported_volume: 100, estimated_volume: 95 }, detectedAt: '2024-05-12T15:35:00Z' },
];

export const mockMarketPrices: MarketPrice[] = [
  { id: 301, itemName: 'Laptop Core i7, 16GB RAM, RTX 3060', category: 'Elektronik', region: 'Jawa', averagePrice: 15500000, unit: 'unit', source: 'e-katalog', lastUpdated: '2024-07-20T00:00:00Z' },
  { id: 302, itemName: 'Semen Gresik 50kg', category: 'Konstruksi', region: 'Nasional', averagePrice: 68000, unit: 'sak', source: 'Riset Internal', lastUpdated: '2024-06-15T00:00:00Z' },
  { id: 303, itemName: 'Jasa Konsultan IT (Senior)', category: 'Jasa', region: 'Jakarta', averagePrice: 1500000, unit: 'orang/hari', source: 'Asosiasi Konsultan', lastUpdated: '2024-07-01T00:00:00Z' },
  { id: 304, itemName: 'Kertas A4 80gr', category: 'ATK', region: 'Nasional', averagePrice: 45000, unit: 'rim', source: 'e-katalog', lastUpdated: '2024-07-25T00:00:00Z' },
  { id: 305, itemName: 'Proyektor Epson EB-X500', category: 'Elektronik', region: 'Nasional', averagePrice: 6500000, unit: 'unit', source: 'e-katalog', lastUpdated: '2024-07-22T00:00:00Z' },
  { id: 306, itemName: 'Beton K-300', category: 'Konstruksi', region: 'Jawa Barat', averagePrice: 850000, unit: 'm3', source: 'Riset Internal', lastUpdated: '2024-07-18T00:00:00Z' },
  { id: 307, itemName: 'Sewa Mobil Avanza', category: 'Jasa', region: 'Bali', averagePrice: 450000, unit: 'hari', source: 'Penyedia Jasa Lokal', lastUpdated: '2024-07-28T00:00:00Z' },
  { id: 308, itemName: 'Tinta Printer HP 682', category: 'ATK', region: 'Nasional', averagePrice: 125000, unit: 'buah', source: 'e-katalog', lastUpdated: '2024-07-29T00:00:00Z' },
];

export const mockArticles: Article[] = [
  { id: 401, adminId: 1, title: 'Mengenal 7 Jenis Korupsi yang Paling Umum', slug: 'mengenal-7-jenis-korupsi', content: 'Korupsi adalah tindakan pejabat publik, baik politisi maupun pegawai negeri, serta pihak lain yang terlibat dalam tindakan itu yang secara tidak wajar dan tidak legal menyalahgunakan kepercayaan publik yang dikuasakan kepada mereka untuk mendapatkan keuntungan sepihak.', status: ArticleStatus.PUBLISHED, publishedAt: '2024-07-10T10:00:00Z', imageUrl: 'https://images.unsplash.com/photo-1591115765321-0498c01b2313?q=80&w=800' },
  { id: 402, adminId: 1, title: 'Cara Membaca Laporan Keuangan untuk Awam', slug: 'cara-membaca-laporan-keuangan', content: 'Laporan keuangan seringkali terlihat rumit bagi orang awam. Namun, dengan memahami beberapa komponen kunci, Anda bisa mendapatkan gambaran besar tentang kesehatan finansial sebuah entitas.', status: ArticleStatus.PUBLISHED, publishedAt: '2024-07-15T14:00:00Z', imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=800' },
  { id: 403, adminId: 1, title: 'Pentingnya Whistleblower dalam Pemberantasan Korupsi', slug: 'pentingnya-whistleblower', content: 'Seorang whistleblower atau peniup peluit memiliki peran krusial dalam membongkar praktik korupsi yang tersembunyi. Keberanian mereka layak mendapatkan apresiasi dan perlindungan hukum.', status: ArticleStatus.DRAFT, publishedAt: '', imageUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=800' },
  { id: 404, adminId: 1, title: 'Studi Kasus: Mark-up Anggaran Proyek Infrastruktur', slug: 'studi-kasus-mark-up', content: 'Salah satu modus korupsi yang paling sering terjadi adalah penggelembungan harga atau mark-up dalam proyek pengadaan barang dan jasa pemerintah.', status: ArticleStatus.PUBLISHED, publishedAt: '2024-07-20T09:00:00Z', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800' },
  { id: 405, adminId: 1, title: 'Memahami Gratifikasi dan Bedanya dengan Suap', slug: 'memahami-gratifikasi', content: 'Gratifikasi sering dianggap "hadiah" atau "ucapan terima kasih", namun dalam konteks jabatan publik, hal ini bisa menjadi pintu masuk korupsi.', status: ArticleStatus.DRAFT, publishedAt: '', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800' },
];

export let mockRabProjects: RabProject[] = [
    { id: 501, userId: 2, projectName: 'Pembangunan Jembatan Desa Sukamaju', totalBudget: 1250000000, createdAt: '2024-06-01T10:00:00Z' },
    { id: 502, userId: 3, projectName: 'Pengadaan Komputer Sekolah se-Kecamatan', totalBudget: 750000000, createdAt: '2024-07-15T11:30:00Z' },
    { id: 503, userId: 4, projectName: 'Rehabilitasi Gedung Kantor Pusat', totalBudget: 350000000, createdAt: '2024-07-20T09:00:00Z' },
];

export let mockRabItems: RabItem[] = [
    // Project 501
    { id: 601, projectId: 501, itemName: 'Beton K-300', quantity: 500, unit: 'm3', unitPrice: 850000, subtotal: 425000000 },
    { id: 602, projectId: 501, itemName: 'Besi Beton Ulir 16mm', quantity: 15000, unit: 'kg', unitPrice: 12000, subtotal: 180000000 },
    { id: 603, projectId: 501, itemName: 'Jasa Tenaga Ahli Konstruksi', quantity: 1, unit: 'paket', unitPrice: 300000000, subtotal: 300000000 },
    { id: 604, projectId: 501, itemName: 'Sewa Alat Berat', quantity: 1, unit: 'paket', unitPrice: 345000000, subtotal: 345000000 }, // Total: 1,250,000,000
    
    // Project 502
    { id: 605, projectId: 502, itemName: 'Komputer All-in-One Core i5', quantity: 100, unit: 'unit', unitPrice: 6500000, subtotal: 650000000 },
    { id: 606, projectId: 502, itemName: 'Instalasi Jaringan & Software', quantity: 1, unit: 'paket', unitPrice: 75000000, subtotal: 75000000 },
    { id: 607, projectId: 502, itemName: 'Pelatihan Guru TIK', quantity: 1, unit: 'paket', unitPrice: 25000000, subtotal: 25000000 }, // Total: 750,000,000

    // Project 503
    { id: 608, projectId: 503, itemName: 'Pengecatan Dinding Eksterior', quantity: 2000, unit: 'm2', unitPrice: 50000, subtotal: 100000000 },
    { id: 609, projectId: 503, itemName: 'Perbaikan Atap dan Talang Air', quantity: 1, unit: 'paket', unitPrice: 80000000, subtotal: 80000000 },
    { id: 610, projectId: 503, itemName: 'Penggantian Lantai Keramik', quantity: 500, unit: 'm2', unitPrice: 150000, subtotal: 75000000 },
    { id: 611, projectId: 503, itemName: 'Instalasi Listrik Baru', quantity: 1, unit: 'paket', unitPrice: 50000000, subtotal: 50000000 },
    { id: 612, projectId: 503, itemName: 'Biaya Tak Terduga (15%)', quantity: 1, unit: 'paket', unitPrice: 45000000, subtotal: 45000000 }, // Total: 350,000,000
];

export const mockActivityLog: ActivityLogItem[] = [
    { id: 1, userId: 1, action: 'menambahkan harga baru', target: 'Semen Gresik 50kg', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { id: 2, userId: 3, action: 'mengunggah laporan', target: 'Anggaran_Proyek_Jalan.pdf', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { id: 3, userId: 1, action: 'menerbitkan artikel', target: 'Mengenal 7 Jenis Korupsi', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { id: 4, userId: 2, action: 'membuat proyek RAB baru', target: 'Pembangunan Jembatan...', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { id: 5, userId: 2, action: 'login ke sistem', target: '', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { id: 6, userId: 1, action: 'mengubah peran pengguna', target: 'Agus Wijaya menjadi User', timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
];