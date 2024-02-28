import { Outlet } from "react-router-dom";
import Map from "./Map";

function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}

export default AppLayout;
