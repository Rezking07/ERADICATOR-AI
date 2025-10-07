import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { to: '/', icon: 'fa-tachometer-alt', text: 'Dasbor' },
  { to: '/users', icon: 'fa-users', text: 'Pengguna' },
  { to: '/reports', icon: 'fa-file-invoice-dollar', text: 'Laporan' },
  { to: '/rab', icon: 'fa-clipboard-list', text: 'Proyek RAB' },
  { to: '/prices', icon: 'fa-tag', text: 'Harga Pasar' },
  { to: '/articles', icon: 'fa-book', text: 'Artikel' },
  { to: '/security', icon: 'fa-shield-alt', text: 'Keamanan' },
];

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <aside className="w-64 bg-white dark:bg-dark-800 flex-shrink-0 flex flex-col border-r border-base-300 dark:border-dark-700">
      <div className="h-20 flex items-center justify-center px-4 border-b border-base-300 dark:border-dark-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-dark to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <i className="fas fa-shield-alt text-white"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">ERADICATOR</h1>
            <p className="text-xs text-text-light-secondary dark:text-gray-400">Panel Admin</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md shadow-primary/20'
                  : 'text-text-light-secondary dark:text-gray-400 hover:bg-base-200 dark:hover:bg-dark-700 hover:text-gray-800 dark:hover:text-white'
              }`
            }
          >
            <i className={`fas ${link.icon} w-5 text-center transition-transform duration-200 group-hover:scale-110`}></i>
            <span className="font-medium">{link.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-base-300 dark:border-dark-700">
         <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors duration-200 text-text-light-secondary dark:text-gray-400 hover:bg-base-200 dark:hover:bg-dark-700 hover:text-gray-800 dark:hover:text-white"
        >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span className="font-medium">Keluar</span>
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;