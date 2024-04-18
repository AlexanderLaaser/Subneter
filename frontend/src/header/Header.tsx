import Logo from "../styles/logo.png";
import "../styles/index.css";

function Header() {
  return (
    <nav className="flex justify-between items-center p-6 font-montserrat ">
      <div className="flex items-center">
        <img className="h-14 w-14" src={Logo} alt="Your Logo" />
        <div className="flex items-center text-3xl font-sky-800 pl-6 text-sky-800	">
          subneter
        </div>
      </div>

      <div className="flex text-black space-x-10 ">
        <button className="mx-2 hover:text-orange-600">Home</button>
        <button className="mx-2 hover:text-orange-600">Calculator</button>
        <button className="mx-2 hover:text-orange-600">How?</button>
      </div>

      <div className="flex space-x-6">
        <button
          type="button"
          className=" text-sky-800 font-bold font-montserrat hover:text-orange-600"
        >
          Login
        </button>
        <button
          type="button"
          className="bg-sky-800 text-white rounded-lg hover:bg-orange-600 w-24"
        >
          Sign up
        </button>
        <button
          type="button"
          className="me-3 inline-block rounded-lg bg-neutral-800 px-3 py-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-orange-600 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          <span className="[&>svg]:w-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
