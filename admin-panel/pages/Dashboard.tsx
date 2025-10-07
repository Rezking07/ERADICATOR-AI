import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockUsers, mockFinancialReports, mockDetectionResults, mockMarketPrices, mockActivityLog, mockRabProjects } from '../data/mockData';
import { FinancialReport, AnalysisStatus, ActivityLogItem } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const StatCard: React.FC<{ icon: string; title: string; value: string | number; color: string; accentColor: string }> = ({ icon, title, value, color, accentColor }) => (
  <Card className={`transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 ${accentColor}`}>
     <div className="flex items-center">
        <div className={`p-3 rounded-lg mr-4 ${color}`}>
            <i className={`fas ${icon} text-white text-xl fa-fw`}></i>
        </div>
        <div>
            <p className="text-sm text-text-light-secondary dark:text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
     </div>
  </Card>
);

const getStatusBadge = (status: AnalysisStatus) => {
    switch (status) {
        case AnalysisStatus.COMPLETED: return <Badge color="secondary">Selesai</Badge>;
        case AnalysisStatus.PROCESSING: return <Badge color="primary">Diproses</Badge>;
        case AnalysisStatus.PENDING: return <Badge color="warning">Tertunda</Badge>;
        case AnalysisStatus.ERROR: return <Badge color="danger">Gagal</Badge>;
        default: return <Badge color="gray">Tidak Diketahui</Badge>;
    }
};

const ActivityItem: React.FC<{ item: ActivityLogItem }> = ({ item }) => {
    const user = mockUsers.find(u => u.id === item.userId);
    const userFullName = user?.fullName || 'Sistem';
    const userAvatar = `https://picsum.photos/seed/${user?.fullName.split(' ')[0].toLowerCase() || 'system'}/40/40`;

    // FIX: The type definitions for date-fns appear to be outdated and are missing the 'locale' property on FormatDistanceOptions.
    // The 'locale' option is valid for recent versions of date-fns, so we cast to 'any' to bypass the type check.
    const timeAgoOptions = { addSuffix: true, locale: id } as any;

    return (
        <div className="flex items-center space-x-4 py-3">
            <img src={userAvatar} alt={userFullName} className="w-10 h-10 rounded-full"/>
            <div className="flex-1">
                <p className="text-sm text-text-light dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-white">{userFullName}</span>
                    {' '}
                    {item.action}
                    {' '}
                    {item.target && <span className="font-semibold text-primary">{item.target}</span>}
                </p>
                <p className="text-xs text-text-light-secondary dark:text-gray-500">
                    {formatDistanceToNow(new Date(item.timestamp), timeAgoOptions)}
                </p>
            </div>
        </div>
    );
}

const Dashboard: React.FC = () => {
    const { theme } = useTheme();
    
    const anomalyData = [
        { name: 'Rendah', count: mockDetectionResults.filter(d => d.severityLevel === 'Rendah').length },
        { name: 'Sedang', count: mockDetectionResults.filter(d => d.severityLevel === 'Sedang').length },
        { name: 'Tinggi', count: mockDetectionResults.filter(d => d.severityLevel === 'Tinggi').length },
        { name: 'Kritis', count: mockDetectionResults.filter(d => d.severityLevel === 'Kritis').length },
    ];
    
    const rabBudgetData = mockRabProjects.map(p => ({
        name: p.projectName,
        value: p.totalBudget
    }));

    const ANOMALY_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#dc2626'];
    const RAB_COLORS = ['#38bdf8', '#818cf8', '#f472b6', '#fb923c', '#a3e635'];

    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1e293b' : '#FFFFFF',
        border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        borderRadius: '0.75rem'
    };
    const axisColor = theme === 'dark' ? '#94a3b8' : '#475569';
    
    const getUserName = (userId: number) => mockUsers.find(u => u.id === userId)?.fullName || 'N/A';

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard icon="fa-users" title="Total Pengguna" value={mockUsers.length} color="bg-primary" accentColor="border-primary" />
                <StatCard icon="fa-file-invoice-dollar" title="Laporan Dianalisis" value={mockFinancialReports.filter(r => r.analysisStatus === 'completed').length} color="bg-secondary" accentColor="border-secondary" />
                <StatCard icon="fa-exclamation-triangle" title="Anomali Terdeteksi" value={mockDetectionResults.length} color="bg-danger" accentColor="border-danger" />
                <StatCard icon="fa-tag" title="Data Harga Pasar" value={mockMarketPrices.length} color="bg-warning" accentColor="border-warning" />
                <StatCard icon="fa-clipboard-list" title="Proyek RAB" value={mockRabProjects.length} color="bg-indigo-500" accentColor="border-indigo-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Card title="Anomali Berdasarkan Tingkat" className="h-full">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={anomalyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
                                <XAxis dataKey="name" stroke={axisColor} />
                                <YAxis stroke={axisColor} />
                                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}/>
                                <Bar dataKey="count" name="Deteksi" >
                                    {anomalyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={ANOMALY_COLORS[index % ANOMALY_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                     <Card title="Alokasi Anggaran Proyek RAB" className="h-full">
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie 
                                    data={rabBudgetData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={110}
                                    innerRadius={70}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    paddingAngle={5}
                                    cornerRadius={8}
                                >
                                    {rabBudgetData.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={RAB_COLORS[index % RAB_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={tooltipStyle}
                                    formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                                />
                                <Legend iconType="circle" />
                            </PieChart>
                         </ResponsiveContainer>
                    </Card>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Laporan Terbaru" className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-base-100 dark:bg-dark-700/50">
                                <tr>
                                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama File</th>
                                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Pengguna</th>
                                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockFinancialReports.slice(0, 5).map((report: FinancialReport) => (
                                    <tr key={report.id} className="border-t border-base-300/50 dark:border-dark-700 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                        <td className="p-4 font-medium text-gray-800 dark:text-white">{report.originalFilename}</td>
                                        <td className="p-4 text-text-light-secondary dark:text-gray-400">{getUserName(report.userId)}</td>
                                        <td className="p-4">{getStatusBadge(report.analysisStatus)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <Card title="Aktivitas Terbaru">
                    <div className="space-y-2">
                        {mockActivityLog.map(item => (
                            <ActivityItem key={item.id} item={item} />
                        ))}
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default Dashboard;