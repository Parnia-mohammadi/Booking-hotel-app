import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: payload };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark: payload,
        bookmarks: [...state.bookmarks, payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id != payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: payload };
    default:
      throw new Error("unknown action");
  }
}

const Base_url = "http://localhost:5000";
const BookmarkListContext = createContext();
export default function BookmarkListContextProvider({ children }) {
  // const [currentBookmark, setCurrentBookmark] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  const [{ bookmarks, isLoading, currentBookmark, error }, dispatch] =
    useReducer(bookmarkReducer, initialState);

  async function getBookmark(id) {
    if (id == currentBookmark?.id) return;
    // setIsLoading(true);
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${Base_url}/bookmarks/${id}`);
      // setCurrentBookmark(data);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an error occured in loading bookmarks",
      });
    }
  }
  async function createBookmark(newBookmark) {
    // setIsLoading(true);
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${Base_url}/bookmarks`, newBookmark);
      // setCurrentBookmark(data);
      // setBookmarks((prev) => [...prev, data]);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function deleteBookmark(id) {
    // setIsLoading(true);
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${Base_url}/bookmarks/${id}`);
      // setBookmarks(bookmarks.filter((item) => item.id != id));
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  useEffect(() => {
    async function fetchBookmarkList() {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${Base_url}/bookmarks`);
        // setBookmarks(data);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchBookmarkList();
  }, []);
  return (
    <BookmarkListContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkListContext.Provider>
  );
}
export function useBookmarks() {
  return useContext(BookmarkListContext);
}
