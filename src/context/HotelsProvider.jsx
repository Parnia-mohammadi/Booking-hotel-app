import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const HotelContext = createContext();
const Base_url = "http://localhost:5000";
export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const destination = searchParams.get("destination" || "");
  const room = JSON.parse(searchParams.get("options"))?.room;
  // console.log(room);
  const { isLoading, data: hotels } = useFetch(
    `${Base_url}/hotels`,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${Base_url}/hotels/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        isLoadingCurrentHotel,
        getHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function UseHotels() {
  return useContext(HotelContext);
}
