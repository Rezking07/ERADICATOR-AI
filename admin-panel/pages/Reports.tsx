import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockFinancialReports, mockUsers } from '../data/mockData';
import { FinancialReport, AnalysisStatus } from '../types';
import Pagination from '../components/ui/Pagination';

const ITEMS_PER_PAGE = 5;

const Reports: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredReports = useMemo(() => {
        return mockFinancialReports.filter(report =>
            report.originalFilename.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (mockUsers.find(u => u.id === report.userId)?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);
    
    const paginatedReports = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredReports, currentPage]);

    const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    
    const getUserName = (userId: number) => mockUsers.find(u => u.id === userId)?.fullName || 'N/A';

    const getStatusBadge = (status: AnalysisStatus) => {
        switch (status) {
            case AnalysisStatus.COMPLETED: return <Badge color="secondary">Selesai</Badge>;
            case AnalysisStatus.PROCESSING: return <Badge color="primary">Diproses</Badge>;
            case AnalysisStatus.PENDING: return <Badge color="warning">Tertunda</Badge>;
            case AnalysisStatus.ERROR: return <Badge color="danger">Gagal</Badge>;
            default: return <Badge color="gray">Tidak Diketahui</Badge>;
        }
    };

    return (
        <Card
            title="Laporan Keuangan"
             action={
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari laporan..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                        <tr>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama File</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Pengguna</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Waktu Unggah</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Deteksi</th>
                            <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedReports.map((report: FinancialReport) => (
                            <tr key={report.id} className="border-b border-base-300/50 dark:border-dark-700 last:border-b-0 even:bg-base-100 dark:even:bg-dark-700/40 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                <td className="p-4 font-medium text-gray-800 dark:text-white">{report.originalFilename}</td>
                                <td className="p-4">{getUserName(report.userId)}</td>
                                <td className="p-4">{new Date(report.uploadTimestamp).toLocaleString('id-ID')}</td>
                                <td className="p-4">{getStatusBadge(report.analysisStatus)}</td>
                                <td className="p-4 text-center font-bold text-lg">
                                    {report.detectionCount > 0 ? (
                                        <span className={report.detectionCount > 2 ? 'text-danger' : 'text-warning'}>
                                            {report.detectionCount}
                                        </span>
                                    ) : (
                                        <span className="text-secondary">{report.detectionCount}</span>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    <Link to={`/reports/${report.id}`} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-px">
                                        Lihat Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Card>
    );
};

export default Reports;