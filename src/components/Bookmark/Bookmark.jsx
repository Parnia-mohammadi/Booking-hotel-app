import { useEffect } from "react";
import { UseBookmarks } from "../../context/BookmarkListContext";
import Loading from "../LocationList/Loading";
import { Link, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

function Bookmark() {
  const { bookmarks, isLoading ,currentBookmark } = UseBookmarks();
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2>Bookmarks List :</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div className={`bookmarkItem ${currentBookmark?.id==item.id?"current-bookmark":""}`} key={item.id}>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
