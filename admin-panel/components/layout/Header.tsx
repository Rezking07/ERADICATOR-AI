import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import ProfileDropdown from './ProfileDropdown';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg sticky top-0 z-20 py-4 px-8 border-b border-base-300 dark:border-dark-700">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
        <div className="flex items-center space-x-6">
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;