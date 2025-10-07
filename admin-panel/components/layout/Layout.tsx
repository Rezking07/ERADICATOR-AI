import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const getTitleFromPath = (path: string): string => {
  if (path.startsWith('/reports/')) return 'Detail Laporan';
  if (path.startsWith('/rab/')) return 'Detail Proyek RAB';
  switch (path) {
    case '/': return 'Dasbor';
    case '/users': return 'Manajemen Pengguna';
    case '/reports': return 'Laporan Keuangan';
    case '/rab': return 'Proyek RAB';
    case '/prices': return 'Database Harga Pasar';
    case '/articles': return 'Manajemen Artikel';
    case '/security': return 'Keamanan Akun';
    default: return 'ERADICATOR';
  }
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);

  return (
    <div className="flex h-screen bg-base-100 dark:bg-dark-900 text-text-light dark:text-gray-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-base-100 dark:bg-dark-900 p-8 animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;