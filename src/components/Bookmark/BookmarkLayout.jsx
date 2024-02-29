import { Outlet } from "react-router-dom";
import Map from "../Map";
import { UseBookmarks } from "../../context/BookmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = UseBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">{Outlet}</div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
