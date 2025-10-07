
import React, { useState, useMemo } from 'react';
import { Report } from '../types';
import Card from '../components/ui/Card';
import { DownloadIcon } from '../components/icons/IconComponents';
import { useI18n } from '../contexts/I18nContext';

const mockAllReports: Report[] = [
    { id: 'RPT-001', type: 'Analysis', name: 'Analisis Proyek Jembatan 2023', date: '2023-10-26', status: 'Completed', risk_level: 'High' },
    { id: 'RPT-002', type: 'RAB', name: 'RAB Gedung Sekolah', date: '2023-10-25', status: 'Completed' },
    { id: 'RPT-003', type: 'Analysis', name: 'Analisis Pengadaan ATK', date: '2023-10-24', status: 'In Progress', risk_level: 'Medium' },
    { id: 'RPT-004', type: 'RAB', name: 'RAB Renovasi Kantor', date: '2023-09-15', status: 'Completed' },
    { id: 'RPT-005', type: 'Analysis', name: 'Audit Pengadaan Laptop', date: '2023-09-10', status: 'Failed', risk_level: 'Low' },
    { id: 'RPT-006', type: 'Analysis', name: 'Pemeriksaan Dana Desa', date: '2023-08-20', status: 'Completed', risk_level: 'Low' },
];

const getStatusClass = (status: Report['status']) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
};

const getRiskClass = (risk?: Report['risk_level']) => {
    switch (risk) {
        case 'High': return 'text-red-500 font-semibold';
        case 'Medium': return 'text-yellow-500 font-semibold';
        case 'Low': return 'text-green-500 font-semibold';
        default: return 'text-gray-500';
    }
};

const History: React.FC = () => {
    const { t } = useI18n();
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const statusOptions = [
        { value: 'All', label: t('allCategories') },
        { value: 'Completed', label: t('statusCompleted') },
        { value: 'In Progress', label: t('statusInProgress') },
        { value: 'Failed', label: t('statusFailed') },
    ];

    const filteredReports = useMemo(() => {
        return mockAllReports.filter(report => {
            const statusMatch = statusFilter === 'All' || report.status === statusFilter;
            const reportDate = new Date(report.date);
            const fromDateMatch = !dateFrom || reportDate >= new Date(dateFrom);
            const toDateMatch = !dateTo || reportDate <= new Date(dateTo);
            return statusMatch && fromDateMatch && toDateMatch;
        });
    }, [statusFilter, dateFrom, dateTo]);
    
    const translateStatus = (status: Report['status']) => {
        const map = {
            'Completed': t('statusCompleted'),
            'In Progress': t('statusInProgress'),
            'Failed': t('statusFailed')
        };
        return map[status];
    };

    const translateRisk = (risk?: Report['risk_level']) => {
        if (!risk) return t('riskNA');
        const map = {
            'High': t('riskHigh'),
            'Medium': t('riskMedium'),
            'Low': t('riskLow')
        };
        return map[risk];
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('historyTitle')}</h1>
            <Card>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('statusFilter')}</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('fromDate')}</label>
                        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('toDate')}</label>
                        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                </div>
            </Card>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('reportId')}</th>
                                <th scope="col" className="px-6 py-3">{t('reportName')}</th>
                                <th scope="col" className="px-6 py-3">{t('reportType')}</th>
                                <th scope="col" className="px-6 py-3">{t('reportDate')}</th>
                                <th scope="col" className="px-6 py-3">{t('reportStatus')}</th>
                                <th scope="col" className="px-6 py-3">{t('reportRisk')}</th>
                                <th scope="col" className="px-6 py-3">{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report) => (
                                <tr key={report.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{report.id}</td>
                                    <td className="px-6 py-4">{report.name}</td>
                                    <td className="px-6 py-4">{report.type}</td>
                                    <td className="px-6 py-4">{report.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(report.status)}`}>{translateStatus(report.status)}</span>
                                    </td>
                                    <td className={`px-6 py-4 ${getRiskClass(report.risk_level)}`}>{translateRisk(report.risk_level)}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200">
                                            <DownloadIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredReports.length === 0 && <p className="text-center py-8 text-gray-500 dark:text-gray-400">{t('noReportsFound')}</p>}
                </div>
            </Card>
        </div>
    );
};

export default History;
