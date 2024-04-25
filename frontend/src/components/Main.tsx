import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./header/LoginPopup";
import Body from "./body/Body";

function Main() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Body />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default Main;
