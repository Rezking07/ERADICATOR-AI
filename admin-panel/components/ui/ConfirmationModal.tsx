import React from 'react';
import Modal from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-danger/10">
          <i className="fas fa-exclamation-triangle text-danger text-2xl"></i>
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4" id="modal-title">
          {title}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-text-light-secondary dark:text-gray-400">
            {message}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-danger text-base font-medium text-white shadow-sm hover:bg-danger-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-dark"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Konfirmasi
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-600 px-4 py-2 bg-white dark:bg-dark-700 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;