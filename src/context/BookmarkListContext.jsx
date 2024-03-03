import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const Base_url = "http://localhost:5000";
const BookmarkListContext = createContext();
export default function BookmarkListContextProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  async function getBookmark(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${Base_url}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${Base_url}/bookmarks`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteBookmark(id) {
    setIsLoading(true);
    try {
      await axios.delete(`${Base_url}/bookmarks/${id}`);
      setBookmarks(bookmarks.filter((item) => item.id != id));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${Base_url}/bookmarks`);
        setBookmarks(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
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
