import { useState } from "react";
import { logoutUser } from "../../api/userCalls";

function Avatar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutButtonClick = async () => {
    await logoutUser;
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="ml-40 bg-sky-800 font-montserrat items-center justify-center w-10 h-10 rounded-full "
        onClick={toggleDropdown}
      >
        <span className="text-white text-sm">AL</span>
      </button>

      {dropdownOpen ? (
        <div
          id="userDropdown"
          className="absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <div className="py-1">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleLogoutButtonClick}
            >
              Sign out
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
