import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-base-200 dark:bg-dark-700 text-text-light-secondary dark:text-gray-400 hover:bg-base-300 dark:hover:bg-dark-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon"></i>
      ) : (
        <i className="fas fa-sun text-yellow-400"></i>
      )}
    </button>
  );
};

export default ThemeToggle;