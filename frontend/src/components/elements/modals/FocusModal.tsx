import React from "react";

interface FocusModalProps {
  onClose: (confirm: boolean) => void;
}

const FocusModal: React.FC<FocusModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-600 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-60 relative">
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => onClose(false)}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4">
          Are you sure you want to leave your Vnet config without saving?
        </h3>
        <div className="flex justify-end space-x-4">
          <button className="btn btn-error" onClick={() => onClose(true)}>
            Yes, I'm sure
          </button>
          <button className="btn btn-outline" onClick={() => onClose(false)}>
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusModal;
