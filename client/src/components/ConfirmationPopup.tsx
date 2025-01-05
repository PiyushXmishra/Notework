import { X } from 'lucide-react';

interface ConfirmationPopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDel:boolean
}

export function ConfirmationPopup({
  isOpen,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDel
}: ConfirmationPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-colorGradient1 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <p className="dark:text-gray-300 text-gray-600">{message}</p>
        </div>
        
        <div className="flex justify-end gap-3 p-4 ">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200  transition-colors dark:hover:bg-colorGradient4 rounded"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={ `px-4 py-2 ${isDel ? "bg-red-600 hover:bg-red-700" : "bg-colorGradient2 hover:bg-black" }  text-white rounded  transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}