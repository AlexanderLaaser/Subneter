import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./header/LoginPopup";
import Register from "./header/RegisterPopup";
import Body from "./body/Body";

function Main() {
  const location = useLocation();
  const state = location.state as {
    loginpopouplocation?: Location;
    registerpopouplocation?: Location;
  };
  const loginpopouplocation = state?.loginpopouplocation;
  const registerpopouplocation = state?.registerpopouplocation;

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <Routes
        location={registerpopouplocation || loginpopouplocation || location}
      >
        <Route path="/" element={<Body />} />
      </Routes>
      {loginpopouplocation && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      {registerpopouplocation && (
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default Main;
