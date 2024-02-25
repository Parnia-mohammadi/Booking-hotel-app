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

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header/>
      <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
