import { Outlet } from "react-router-dom";
import Map from "./Map";
import { UseHotels } from "../context/HotelsProvider";

function AppLayout() {
  const { hotels } = UseHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={hotels} />
    </div>
  );
}

export default AppLayout;
