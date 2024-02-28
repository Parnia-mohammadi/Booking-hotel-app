import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/LocationList/Loading";

const Base_url = "http://localhost:5000";
const BookmarkListContext = createContext();
export default function BookmarkListContextProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { data: bookmarks, isLoading } = useFetch(`${Base_url}/bookmarks`);
  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data, isLoading } = await axios.get(
        `${Base_url}/bookmarks/${id}`
      );
      setCurrentBookmark(data);
      setIsLoadingCurrentBookmark(isLoading);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }
  if (isLoading) return <Loading />;
  return (
    <BookmarkListContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        isLoadingCurrentBookmark,
        getBookmark,
      }}
    >
      {children}
    </BookmarkListContext.Provider>
  );
}
function UseBookmarks() {
  return useContext(BookmarkListContext);
}
