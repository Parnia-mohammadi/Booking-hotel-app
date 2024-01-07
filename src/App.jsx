import { Toaster } from "react-hot-toast";
import "./App.css";
// import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelsList from "./components/HotelsList";
import SingleHotel from "./components/SingleHotel";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LocationList />} />
          <Route path="/hotels" element={<Hotels />}>
            <Route index element={<HotelsList />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
