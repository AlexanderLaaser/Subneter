import Logo from "../../styles/logo.png";
import { Link, useLocation } from "react-router-dom";

import Avatar from "./Avatar";
import { useUserStore } from "../../store/UserStore";

function Header() {
  const location = useLocation();

  const { userLoginStatus } = useUserStore();
  return (
    <nav className="flex justify-between items-center p-6 font-montserrat">
      <div className="flex items-center">
        <Link to="/">
          <img className="h-14 w-14" src={Logo} alt="Your Logo" />
        </Link>
        <div className="flex items-center text-3xl font-sky-800 pl-6 text-sky-800	">
          <Link to="/">subneter</Link>
        </div>
      </div>
      <div className="flex text-black space-x-10">
        <Link to="/" className="mx-2 hover:text-orange-600">
          Home
        </Link>
        <Link to="/updates" className="mx-2 hover:text-orange-600">
          Updates
        </Link>
      </div>
      {userLoginStatus ? (
        <Avatar></Avatar>
      ) : (
        <div className="flex space-x-6">
          <div className="flex justify-center w-24 h-8 text-center bg-sky-800 text-white rounded-lg hover:bg-orange-600 ml-28">
            <Link
              to="/login"
              state={{ loginpopouplocation: location }}
              className="flex items-center justify-center w-full h-full"
            >
              Login
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
