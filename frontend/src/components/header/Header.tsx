import Logo from "../../styles/logo.png";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useUserStore } from "../../store/UserStore";

function Header() {
  const location = useLocation();
  const { userLoginStatus } = useUserStore();

  return (
    <div className=" bg-slate-300 font-montserrat">
      <div className="flex justify-between p-2 z-50  ">
        <div className="flex flex-1 text-white space-x-10 items-center ">
          <div>
            <Link to="/">
              <img className="h-10 w-10" src={Logo} alt="Your Logo" />
            </Link>
          </div>
          <div></div>
        </div>

        {userLoginStatus ? (
          <Avatar />
        ) : (
          <div className="flex space-x-6 justify-center items-center">
            <div className=" w-24 h-8 text-center bg-sky-800 text-white rounded-lg hover:bg-orange-600 ml-28">
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
    </div>
  );
}

export default Header;
