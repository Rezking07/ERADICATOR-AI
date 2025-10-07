import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

const ProfileDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-3">
                <img
                    src="https://picsum.photos/seed/admin/40/40"
                    alt="Admin"
                    className="w-10 h-10 rounded-full border-2 border-primary/50"
                />
                <div className="text-right hidden md:block">
                    <p className="font-semibold text-gray-800 dark:text-white leading-tight">{user?.fullName}</p>
                    <p className="text-sm text-text-light-secondary dark:text-gray-400 leading-tight">{user?.email}</p>
                </div>
                 <i className={`fas fa-chevron-down text-xs text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-700 rounded-lg shadow-xl border border-base-300 dark:border-dark-600 overflow-hidden z-30">
                    <div className="p-4 border-b border-base-300 dark:border-dark-600">
                        <p className="font-semibold text-gray-800 dark:text-white">{user?.fullName}</p>
                        <p className="text-sm text-text-light-secondary dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <div className="py-2">
                        <NavLink to="/security" className="flex items-center w-full px-4 py-2 text-sm text-text-light dark:text-gray-300 hover:bg-base-200 dark:hover:bg-dark-600">
                           <i className="fas fa-shield-alt w-6 text-center mr-2"></i> Keamanan
                        </NavLink>
                        <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm text-text-light dark:text-gray-300 hover:bg-base-200 dark:hover:bg-dark-600">
                           <i className="fas fa-sign-out-alt w-6 text-center mr-2"></i> Keluar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;