import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <span className="text-sm text-text-light-secondary dark:text-gray-400">
        Halaman {currentPage} dari {totalPages}
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-base-200 dark:bg-dark-700 hover:bg-base-300 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-chevron-left mr-2"></i>
          Sebelumnya
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-base-200 dark:bg-dark-700 hover:bg-base-300 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Berikutnya
          <i className="fas fa-chevron-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;