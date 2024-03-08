import { Toaster } from "react-hot-toast";
import "./App.css";
// import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
// import HotelsList from "./components/HotelsList";
import SingleHotel from "./components/SingleHotel";
import Header from "./components/Header/Header";
import HotelsProvider from "./context/HotelsProvider";
import BookmarkLayout from "./components/Bookmark/BookmarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkAdd from "./components/Bookmark/BookmarkAdd";
import BookmarkListContextProvider from "./context/BookmarkListContext";
import SingleBookmark from "./components/Bookmark/SingleBookmark";
import AuthProvider from "./context/AuthProvider";
import Login from "./components/Header/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkListContextProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmarks" element={<BookmarkLayout />}>
              <Route index element={<Bookmark />} />
              <Route path="add" element={<ProtectedRoute><BookmarkAdd /></ProtectedRoute>} />
              <Route path=":id" element={<SingleBookmark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarkListContextProvider>
    </AuthProvider>
  );
}

export default App;
