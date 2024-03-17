import Logo from "../styles/logo.png";

function Header() {
  return (
    <nav className="bg-white flex p-6">
      <img className="h-14" src={Logo} alt="Your Logo" />
      <div className="font-montserrat flex items-center text-4xl font-bold pl-8">
        subneter.io
      </div>
    </nav>
  );
}

export default Header;
