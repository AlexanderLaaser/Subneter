import { useEffect, useState } from "react";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

function SuccessPopup({ message, onClose }: SuccessPopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center mt-4">
      <div
        className={`bg-green-100 rounded-md p-3 flex relative transform transition-transform duration-500 ease-in-out ${
          !visible
            ? "translate-y-[-100%] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <svg
          className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <div className="text-green-700">
          <div className="font-bold text-xl">Success!</div>
          <div>{message}</div>
        </div>
        <button
          className="absolute top-0 right-0 m-2 text-green-600 hover:text-green-800"
          onClick={() => setVisible(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;
