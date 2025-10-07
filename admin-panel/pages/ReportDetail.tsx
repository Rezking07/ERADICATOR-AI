import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockFinancialReports, mockDetectionResults, mockUsers } from '../data/mockData';
import { FinancialReport, DetectionResult, SeverityLevel } from '../types';
import { generateSummary } from '../services/geminiService';

const ReportDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [report, setReport] = useState<FinancialReport | null>(null);
    const [detections, setDetections] = useState<DetectionResult[]>([]);
    const [summary, setSummary] = useState<string>('');
    const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);

    useEffect(() => {
        const reportId = parseInt(id || '0', 10);
        const foundReport = mockFinancialReports.find(r => r.id === reportId) || null;
        setReport(foundReport);
        if (foundReport) {
            const foundDetections = mockDetectionResults.filter(d => d.reportId === reportId);
            setDetections(foundDetections);
        }
    }, [id]);

    const handleGenerateSummary = useCallback(async () => {
        if (!report || detections.length === 0) return;
        setIsLoadingSummary(true);
        setSummary('');
        const result = await generateSummary(report.originalFilename, detections);
        setSummary(result);
        setIsLoadingSummary(false);
    }, [report, detections]);

    const getSeverityBadge = (level: SeverityLevel) => {
        switch (level) {
            case SeverityLevel.KRITIS:
            case SeverityLevel.TINGGI:
                return <Badge color="danger">{level}</Badge>;
            case SeverityLevel.SEDANG:
                return <Badge color="warning">{level}</Badge>;
            case SeverityLevel.RENDAH:
                return <Badge color="secondary">{level}</Badge>;
            default:
                return <Badge color="gray">{level}</Badge>;
        }
    };

    if (!report) {
        return (
            <Card>
                <p>Laporan tidak ditemukan.</p>
                <Link to="/reports" className="text-primary mt-4 inline-block">Kembali ke Laporan</Link>
            </Card>
        );
    }
    
    const userFullName = mockUsers.find(u => u.id === report.userId)?.fullName || 'Pengguna Tidak Dikenal';

    return (
        <div className="space-y-8">
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{report.originalFilename}</h2>
                        <p className="text-text-light-secondary dark:text-gray-400">Diupload oleh: {userFullName} pada {new Date(report.uploadTimestamp).toLocaleString('id-ID')}</p>
                    </div>
                    <Link to="/reports" className="text-sm text-primary hover:underline">
                        &larr; Kembali ke semua laporan
                    </Link>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Hasil Deteksi</h3>
                    {detections.length > 0 ? (
                        <div className="space-y-4">
                            {detections.map(d => (
                                <div key={d.id} className="p-4 rounded-lg bg-base-200 dark:bg-dark-700/50 border border-base-300 dark:border-dark-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-primary">{d.anomalyType}</h4>
                                        {getSeverityBadge(d.severityLevel)}
                                    </div>
                                    <p className="text-sm text-text-light dark:text-gray-300 mb-2">{d.description}</p>
                                    <pre className="text-xs bg-base-100 dark:bg-dark-900 p-2 rounded text-text-light-secondary dark:text-gray-400 overflow-auto">
                                        {JSON.stringify(d.offendingData, null, 2)}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Tidak ada anomali yang terdeteksi dalam laporan ini.</p>
                    )}
                </Card>
                
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ringkasan AI</h3>
                        <button 
                            onClick={handleGenerateSummary}
                            disabled={isLoadingSummary || detections.length === 0}
                            className="bg-primary px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoadingSummary ? (
                                <><i className="fas fa-spinner fa-spin mr-2"></i>Membuat...</>
                            ) : (
                                <><i className="fas fa-magic mr-2"></i>Buat Ringkasan</>
                            )}
                        </button>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none bg-base-200 dark:bg-dark-700/50 p-4 rounded-lg min-h-[200px]">
                        {isLoadingSummary && <p className="text-text-light-secondary dark:text-gray-400">Membuat ringkasan dengan Gemini AI. Ini mungkin perlu beberapa saat...</p>}
                        {summary ? <ReactMarkdown>{summary}</ReactMarkdown> : <p className="text-text-light-secondary dark:text-gray-500">Klik "Buat Ringkasan" untuk mendapatkan tinjauan temuan yang didukung AI.</p>}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ReportDetail;