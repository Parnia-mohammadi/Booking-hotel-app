import { useEffect, useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  function getPosition() {
    setIsLoading(true);
    if (!navigator.geolocation) return setError("Your browser does'nt support geolocation");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setError(err.massage);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, getPosition };
}
