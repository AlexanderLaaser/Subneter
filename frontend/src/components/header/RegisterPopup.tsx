import { useNavigate } from "react-router-dom";
import iUser from "../../interfaces/iUser";
import { useState } from "react";
import { registerUser } from "../../api/userCalls";

function SignUpPopUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState<iUser>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    isAuthenticated: false,
  });

  function handleClickToHome() {
    navigate("/");
  }

  async function handleClickToRegisterUser() {
    await registerUser(user);
  }

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(user);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex  backdrop-blur-sm">
      <div className="relative w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={handleClickToHome}
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
            onClick={handleClickToRegisterUser}
            action="#"
          >
            <h3 className="text-xl text-sky-800 font-medium dark:text-white">
              Register to Subneter
            </h3>
            <div className="space-y-4">
              <div className="flex flex-row justify-between">
                <div className="">
                  <label
                    htmlFor="fullname"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={handleInputFieldChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-orange-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John"
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="fullname"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    onChange={handleInputFieldChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-orange-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Doe"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="fullname"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleInputFieldChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-orange-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="johndoe123"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputFieldChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-orange-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Input password
                </label>
                <input
                  type="password"
                  name="password"
                  id="initpassword"
                  onChange={handleInputFieldChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-sky-800 hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPopUp;
