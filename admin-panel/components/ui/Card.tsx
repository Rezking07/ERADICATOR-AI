import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-base-200 dark:bg-dark-800 rounded-xl shadow-md border border-base-300/50 dark:border-dark-700 ${className}`}>
      {(title || action) && (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 border-b border-base-300/50 dark:border-dark-700">
          {title && <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;