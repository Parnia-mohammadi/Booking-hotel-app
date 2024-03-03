import { useBookmarks } from "../../context/BookmarkListContext";
import Loading from "../LocationList/Loading";
import { Link, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmarks();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  if (isLoading) return <Loading />;
  if (!isLoading && !bookmarks.length)
    return (
      <h3>
        There is no bookmark. please click somewhere on map and add it to the
        bookmarks list.
      </h3>
    );
  return (
    <div>
      <h2>Bookmarks List :</h2>
      <div className="bookmarkList">
        {bookmarks?.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  currentBookmark?.id == item.id ? "current-bookmark" : ""
                }`}
                key={item.id}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong>&nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
