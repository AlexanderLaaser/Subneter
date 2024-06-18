import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./header/LoginPopup";
import Register from "./header/RegisterPopup";
import Page from "./Page";

function Main() {
  const location = useLocation();
  const state = location.state as {
    loginpopouplocation?: Location;
    registerpopouplocation?: Location;
  };
  const loginpopouplocation = state?.loginpopouplocation;
  const registerpopouplocation = state?.registerpopouplocation;

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Routes
        location={registerpopouplocation || loginpopouplocation || location}
      >
        <Route path="/" element={<Page />} />
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
