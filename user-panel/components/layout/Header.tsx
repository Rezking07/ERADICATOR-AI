
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon, BellIcon, ShieldIcon, GlobeIcon } from '../icons/IconComponents';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';

const Header: React.FC<{ setSidebarOpen: (open: boolean) => void }> = ({ setSidebarOpen }) => {
    const { theme, toggleTheme } = useTheme();
    const { locale, setLocale } = useI18n();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button onClick={() => setSidebarOpen(true)} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link to="/dashboard" className="flex items-center ms-2 md:me-24">
                            <ShieldIcon className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Eradicator</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} className="p-2 mr-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none">
                                <GlobeIcon className="w-5 h-5" />
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                                    <button
                                        onClick={() => { setLocale('id'); setIsLangDropdownOpen(false); }}
                                        className={`block px-4 py-2 text-sm w-full text-left ${locale === 'id' ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-600`}
                                    >
                                        Bahasa Indonesia
                                    </button>
                                    <button
                                        onClick={() => { setLocale('en'); setIsLangDropdownOpen(false); }}
                                        className={`block px-4 py-2 text-sm w-full text-left ${locale === 'en' ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-600`}
                                    >
                                        English
                                    </button>
                                </div>
                            )}
                        </div>
                        <button onClick={toggleTheme} className="p-2 mr-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none">
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                        <Link to="/notifications" className="p-2 mr-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none">
                            <BellIcon className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center ms-3">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://picsum.photos/100" alt="user photo" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
