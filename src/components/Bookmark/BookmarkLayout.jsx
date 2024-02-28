import { Outlet } from "react-router-dom";
import Map from "../Map";

function BookmarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">{Outlet}</div>
      <Map />
    </div>
  );
}

export default BookmarkLayout;
