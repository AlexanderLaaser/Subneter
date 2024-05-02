import { Link, useLocation, useNavigate } from "react-router-dom";
import microsoftLogo from "../../styles/microsoft-logo.png";
import googleLogo from "../../styles/google-logo.svg";
import githubLogo from "../../styles/github-logo.svg";
import { loginUser } from "../../api/userCalls";
import { useState } from "react";
import UserStore from "../../store/UserStore";

function LoginPopUp() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function clickToHome() {
    navigate("/");
  }

  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(loginCreds);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent the default form submission
    try {
      await loginUser(loginCreds.username, loginCreds.password);
      clickToHome();
      setuserLoginStatus(true);
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally handle errors, perhaps showing a message to the user
    }
  }

  const { setuserLoginStatus } = UserStore((state) => ({
    setuserLoginStatus: state.setuserLoginStatus,
  }));

  const location = useLocation();
  const state = location.state as {
    loginpopouplocation?: Location;
  };
  const loginpopouplocation = state?.loginpopouplocation;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex font-montserrat backdrop-blur-sm">
      <div className="relative w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={clickToHome}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
            action="#"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl text-sky-800 font-medium dark:text-white">
              Sign in to Subneter
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-orange-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  onChange={handleInputFieldChange}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={handleInputFieldChange}
                ></input>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  ></input>
                </div>
                <div className="text-sm ml-3">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm text-blue-700 hover:underline hover:text-orange-600 dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>

            <div className="flex flex-row gap-2">
              <button className="inline-flex h-10 rounded-lg w-full items-center justify-center gap-2 border border-sky-800 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 hover:border-orange-600">
                <img src={googleLogo} alt="Your Logo" className="h-6 w-6"></img>
                Google
              </button>
              <button className="inline-flex h-10 rounded-lg w-full items-center justify-center gap-2 border border-sky-800 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 hover:border-orange-600">
                <img
                  src={microsoftLogo}
                  alt="Your Logo"
                  className="h-6 w-6"
                ></img>{" "}
                Microsoft
              </button>
              <button className="inline-flex h-10 rounded-lg w-full items-center justify-center gap-2 border border-sky-800 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 hover:border-orange-600">
                <img src={githubLogo} alt="Your Logo" className="h-6 w-6"></img>{" "}
                GitHub
              </button>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-sky-800 hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <div className="flex flex-row text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="#"
                className="text-blue-700 hover:underline hover:text-orange-600  dark:text-blue-500"
              >
                <Link
                  to="/register"
                  className="pl-1"
                  state={{ registerpopouplocation: loginpopouplocation }}
                >
                  Create Account
                </Link>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPopUp;
