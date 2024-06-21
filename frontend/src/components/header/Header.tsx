import Logo from "../../styles/logo.png";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useUserStore } from "../../store/UserStore";

function Header() {
  const location = useLocation();
  const { userLoginStatus } = useUserStore();

  return (
    <div className="flex justify-between p-2 z-50 bg-white">
      <div className="flex flex-1 flex-row text-white space-x-4 items-center w-1/6">
        <div className="hover:scale-110 transition">
          <Link to="/">
            <img className="h-10 w-10 " src={Logo} alt="Your Logo" />
          </Link>
        </div>

        <div className="flex text-lg font-bold text-sky-800">subneter</div>
      </div>
      <div className="flex flex-1 flex-row space-x-10 items-center justify-center text-black ">
        <div>
          <Link
            to="/"
            className="hover:text-white hover:bg-secondary rounded-lg p-2 "
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            to="/updates"
            className="hover:text-white hover:bg-secondary rounded-lg p-2"
          >
            Updates
          </Link>
        </div>
        <div>
          <Link
            to="/knowledge"
            className="hover:text-white hover:bg-secondary rounded-lg p-2"
          >
            Kownledge
          </Link>
        </div>
      </div>

      {userLoginStatus ? (
        <Avatar />
      ) : (
        <div className="flex flex-row flex-1 space-x-2 justify-end items-center w-1/6">
          <div className="flex text-sky-800 bg-white rounded-lg hover:bg-secondary hover:text-white p-2 ">
            <Link
              to="/login"
              state={{ loginpopouplocation: location }}
              className="flex items-center h-full font-semibold"
            >
              Login
            </Link>
          </div>
          <div className="flex bg-sky-800 text-white rounded-lg hover:bg-secondary p-2">
            <Link
              to="/register"
              state={{ registerpopouplocation: location }}
              className="flex items-center h-full font-semibold"
            >
              Sign Up
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
