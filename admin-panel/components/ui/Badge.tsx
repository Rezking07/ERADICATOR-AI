import React from 'react';

interface BadgeProps {
  color: 'primary' | 'secondary' | 'danger' | 'warning' | 'gray';
  children: React.ReactNode;
}

const colorClasses = {
  primary: 'bg-primary/20 text-primary-dark dark:text-primary-light',
  secondary: 'bg-secondary/20 text-secondary-dark dark:text-secondary-light',
  danger: 'bg-danger/20 text-danger-dark dark:text-danger-light',
  warning: 'bg-warning/20 text-warning-dark dark:text-warning-light',
  gray: 'bg-dark-600/50 text-gray-500 dark:text-gray-300',
};

const Badge: React.FC<BadgeProps> = ({ color, children }) => {
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

export default Badge;