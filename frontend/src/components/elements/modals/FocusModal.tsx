import React from "react";

interface FocusModalProps {
  onClose: (confirm: boolean) => void;
  message: string;
}

const FocusModal: React.FC<FocusModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-600 opacity-75"></div>

      <div className="flex flex-row bg-white rounded-lg p-8 z-60 relative">
        <div className="flex-none items-center content-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-20 text-warning"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div className="flex-1 pl-8">
          <h3 className="text font-normal mb-4">{message}</h3>
          <div className="flex justify-end space-x-4">
            <button
              className="btn btn-error bg-warning hover:bg-warningsec text-white transition hover:scale-110"
              onClick={() => onClose(true)}
            >
              Yes, I'm sure
            </button>
            <button
              className="btn btn-outline transition hover:scale-110 hover:bg-gray-200 hover:text-black hover:border-none"
              onClick={() => onClose(false)}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusModal;
