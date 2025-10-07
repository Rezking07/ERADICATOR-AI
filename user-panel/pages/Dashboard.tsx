
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Report } from '../types';
import { SearchIcon, FileTextIcon, BookOpenIcon, BotIcon } from '../components/icons/IconComponents';
import { getDashboardInsight } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import { useI18n } from '../contexts/I18nContext';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useI18n();
    const [aiInsight, setAiInsight] = useState<string>('');
    const [isInsightLoading, setIsInsightLoading] = useState(true);

    const quickAccessItems = [
        { title: t('quickAccess.analysisTitle'), path: '/analysis', icon: SearchIcon, description: t('quickAccess.analysisDesc') },
        { title: t('quickAccess.rabTitle'), path: '/rab', icon: FileTextIcon, description: t('quickAccess.rabDesc') },
        { title: t('quickAccess.articlesTitle'), path: '/articles', icon: BookOpenIcon, description: t('quickAccess.articlesDesc') },
        { title: t('quickAccess.aiAssistantTitle'), path: '/ai-assistant', icon: BotIcon, description: t('quickAccess.aiAssistantDesc') },
    ];

    const mockRecentReports: Report[] = [
        { id: 'RPT-001', type: 'Analysis', name: 'Analisis Proyek Jembatan 2023', date: '2023-10-26', status: 'Completed', risk_level: 'High' },
        { id: 'RPT-002', type: 'RAB', name: 'RAB Gedung Sekolah', date: '2023-10-25', status: 'Completed' },
        { id: 'RPT-003', type: 'Analysis', name: 'Analisis Pengadaan ATK', date: '2023-10-24', status: 'In Progress', risk_level: 'Medium' },
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

    useEffect(() => {
        const fetchInsight = async () => {
            setIsInsightLoading(true);
            const result = await getDashboardInsight();
            setAiInsight(result.insight);
            setIsInsightLoading(false);
        };
        fetchInsight();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('dashboardTitle')}</h1>
            
            <Card className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <BotIcon className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                    {t('aiInsightToday')}
                </h3>
                {isInsightLoading ? (
                    <div className="flex items-center justify-center h-10">
                        <Spinner />
                    </div>
                ) : (
                    <p className="text-gray-700 dark:text-gray-300 italic">"{aiInsight}"</p>
                )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickAccessItems.map((item) => (
                    <Card key={item.title} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => navigate(item.path)}>
                        <div className="flex flex-col items-start h-full">
                            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg mb-4">
                                <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{item.description}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('recentReports')}</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {mockRecentReports.map((report) => (
                                <tr key={report.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{report.id}</td>
                                    <td className="px-6 py-4">{report.name}</td>
                                    <td className="px-6 py-4">{report.type}</td>
                                    <td className="px-6 py-4">{report.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(report.status)}`}>{translateStatus(report.status)}</span>
                                    </td>
                                     <td className={`px-6 py-4 ${getRiskClass(report.risk_level)}`}>{translateRisk(report.risk_level)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
