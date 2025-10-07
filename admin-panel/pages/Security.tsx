import React from 'react';
import Card from '../components/ui/Card';

const Security: React.FC = () => {
    const activityLog = [
        { id: 1, action: 'Login Berhasil', ip: '103.22.11.5', time: '2024-07-30 10:05 AM', device: 'Chrome on Windows' },
        { id: 2, action: 'Kata Sandi Diubah', ip: '103.22.11.5', time: '2024-07-28 08:30 PM', device: 'Chrome on Windows' },
        { id: 3, action: 'Upaya Login Gagal', ip: '192.168.1.10', time: '2024-07-27 11:00 AM', device: 'Unknown' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Change Password Card */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Ubah Kata Sandi</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-2">Kata Sandi Saat Ini</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-2">Kata Sandi Baru</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-2">Konfirmasi Kata Sandi Baru</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="pt-2">
                             <button type="submit" className="bg-primary text-white py-2 px-5 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                                Perbarui Kata Sandi
                            </button>
                        </div>
                    </form>
                </Card>
                
                {/* Two-Factor Authentication Card */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Autentikasi Dua Faktor (2FA)</h2>
                    <div className="flex items-center justify-between p-4 bg-base-100 dark:bg-dark-700/50 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-800 dark:text-white">Aktifkan 2FA</h3>
                            <p className="text-sm text-text-light-secondary dark:text-gray-400">Tambahkan lapisan keamanan ekstra ke akun Anda.</p>
                        </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <p className="text-sm text-text-light-secondary dark:text-gray-400 mt-4">
                        Setelah diaktifkan, Anda akan diminta kode dari aplikasi autentikator saat login.
                    </p>
                </Card>
            </div>
            
            {/* Recent Activity Card */}
            <Card>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Aktivitas Terbaru</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                            <tr>
                                <th className="p-3 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                                <th className="p-3 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Perangkat</th>
                                <th className="p-3 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Alamat IP</th>
                                <th className="p-3 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Waktu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityLog.map((log) => (
                                <tr key={log.id} className="border-b border-base-300 dark:border-dark-700 even:bg-base-200/40 dark:even:bg-dark-700/40 hover:bg-base-200/60 dark:hover:bg-dark-700/60 transition-colors">
                                    <td className="p-3 font-medium text-gray-800 dark:text-white">{log.action}</td>
                                    <td className="p-3">{log.device}</td>
                                    <td className="p-3">{log.ip}</td>
                                    <td className="p-3">{log.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Security;