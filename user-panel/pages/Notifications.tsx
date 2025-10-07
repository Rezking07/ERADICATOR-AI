
import React, { useState } from 'react';
import { Notification } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useI18n } from '../contexts/I18nContext';

const mockNotifications: Notification[] = [
    { id: 1, title: 'Analisis Selesai', message: 'Analisis untuk "Proyek Jembatan 2023" telah selesai dengan potensi resiko TINGGI.', timestamp: '2 jam yang lalu', read: false },
    { id: 2, title: 'RAB Dibuat', message: 'RAB untuk "Gedung Sekolah" berhasil dibuat dan disimpan.', timestamp: '1 hari yang lalu', read: false },
    { id: 3, title: 'Analisis Gagal', message: 'Analisis untuk file "audit_q3.xlsx" gagal diproses. Silakan coba lagi.', timestamp: '2 hari yang lalu', read: true },
    { id: 4, title: 'Artikel Baru', message: 'Artikel baru "Mengenal Whistleblower" telah dipublikasikan. Baca sekarang!', timestamp: '4 hari yang lalu', read: true },
];

const Notifications: React.FC = () => {
    const { t } = useI18n();
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('notificationsCenter')}</h1>
                <Button onClick={markAllAsRead} variant="secondary" size="sm">{t('markAllRead')}</Button>
            </div>

            <Card className="p-0">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map(notification => (
                        <li 
                            key={notification.id} 
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-start gap-4 ${!notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                        >
                            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${!notification.read ? 'bg-primary-500' : 'bg-transparent'}`}></div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-900 dark:text-white">{notification.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{notification.timestamp}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                                {!notification.read && (
                                    <button onClick={() => markAsRead(notification.id)} className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-2">
                                        {t('markAsRead')}
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                 {notifications.length === 0 && <p className="text-center py-8 text-gray-500 dark:text-gray-400">{t('noNotifications')}</p>}
            </Card>
        </div>
    );
};

export default Notifications;
