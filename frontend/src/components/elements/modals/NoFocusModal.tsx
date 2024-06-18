import { useEffect, useState, FC } from "react";

interface NoFocusModalProps {
  message: string;
  type: "warning" | "success" | "danger";
  onClose: () => void;
}

const NoFocusModal: FC<NoFocusModalProps> = ({ message, type, onClose }) => {
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

  const getColor = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-600 text-yellow-600";
      case "success":
        return "bg-green-600 text-green-600";
      case "danger":
        return "bg-red-600 text-red-600";
      default:
        return "bg-gray-600 text-gray-600";
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center mt-4">
      <div className="flex w-1/2 shadow-lg rounded-lg">
        <div
          className={`py-4 px-6 rounded-l-lg flex items-center ${getColor()}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="fill-current text-white "
            width="20"
            height="20"
          >
            {type === "warning" && (
              <path
                fillRule="evenodd"
                d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
              ></path>
            )}
            {type === "success" && (
              <path
                fillRule="evenodd"
                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
              ></path>
            )}
            {type === "danger" && (
              <path
                fillRule="evenodd"
                d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
              ></path>
            )}
          </svg>
        </div>
        <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
          <div>{message}</div>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current ${getColor()} bg-white`}
              viewBox="0 0 16 16"
              width="20"
              height="20"
            >
              <path
                fillRule="evenodd"
                d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoFocusModal;
