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

function App() {
  return (
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
            <Route path="add" element={<BookmarkAdd />} />
            <Route path=":id" element={<div>single bookmark</div>}/>
          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarkListContextProvider>
  );
}

export default App;
