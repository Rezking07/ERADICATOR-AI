
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, SearchIcon, FileTextIcon, BookOpenIcon, BotIcon, HistoryIcon, BellIcon, UserIcon, LogOutIcon, PriceTagIcon } from '../icons/IconComponents';
import Modal from '../ui/Modal';
import { useI18n } from '../../contexts/I18nContext';

const Sidebar: React.FC<{ sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }> = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const { t } = useI18n();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navItems = [
        { path: '/dashboard', icon: HomeIcon, label: t('dashboard') },
        { path: '/analysis', icon: SearchIcon, label: t('corruptionAnalysis') },
        { path: '/rab', icon: FileTextIcon, label: t('rabCreation') },
        { path: '/price-reference', icon: PriceTagIcon, label: t('priceReference') },
        { path: '/articles', icon: BookOpenIcon, label: t('literacyArticles') },
        { path: '/ai-assistant', icon: BotIcon, label: t('aiAssistant') },
        { path: '/history', icon: HistoryIcon, label: t('history') },
        { path: '/notifications', icon: BellIcon, label: t('notifications') },
        { path: '/profile', icon: UserIcon, label: t('profile') },
    ];

    const handleLogoutConfirm = () => {
        localStorage.removeItem('authToken');
        setIsLogoutModalOpen(false);
        navigate('/login');
    };

    const linkClasses = "flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group";
    const activeLinkClasses = "bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-white";

    return (
        <>
            <aside 
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} 
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
                    <ul className="space-y-2 font-medium">
                        {navItems.map(item => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div>
                         <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className={`${linkClasses} w-full`}
                        >
                            <LogOutIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ms-3">{t('logout')}</span>
                        </button>
                    </div>
                </div>
            </aside>
            {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden" onClick={() => setSidebarOpen(false)}></div>}
            
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
                title={t('logoutConfirmTitle')}
                confirmText={t('logoutConfirmButton')}
                cancelText={t('cancel')}
                confirmVariant="danger"
            >
                <p>{t('logoutConfirmText')}</p>
            </Modal>
        </>
    );
};

export default Sidebar;
