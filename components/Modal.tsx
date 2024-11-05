import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5 animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
        <p className="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus item ini?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded mr-2 transition hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded transition hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
