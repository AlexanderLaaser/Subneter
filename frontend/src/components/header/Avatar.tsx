import { useState } from "react";
import { getCurrentUser, logoutUser } from "../../api/userCalls";
import { useUserStore } from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";

function Avatar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const {
    firstname,
    lastname,
    email,
    setFirstname,
    setLastname,
    setEmail,
    setuserLoginStatus,
  } = useUserStore();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  async function handleLogoutButtonClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    console.log("Logout wird versucht");
    try {
      await logoutUser();
      setuserLoginStatus(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  }

  async function setUserData() {
    const userData = await getCurrentUser();
    setuserLoginStatus(true);
    console.log(userData);

    if (userData) {
      setFirstname(userData.user.first_name);
      setLastname(userData.user.last_name);
      setEmail(userData.user.email);
    } else {
      throw new Error("Failed to retrieve user data");
    }
  }

  useEffect(() => {
    setUserData();
  }, []);

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
          className="absolute top-full mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium truncate">
              <div>{email}</div>
              <div>{firstname + " " + lastname}</div>
            </div>
          </div>
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-sky-800 hover:text-orange-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleLogoutButtonClick}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
