import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { UseHotels } from "../context/HotelsProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./LocationList/Loading";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "../hooks/useGeoLocation";

function Map() {
  const { isLoading, hotels } = UseHotels();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  // console.log(hotels);
  const [mapCenter, setMapCenter] = useState([48.56, 2.35]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition?.lat, geoLocationPosition?.lng]);
  }, [geoLocationPosition]);
  if (isLoading) <Loading />;
  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="map mapContainer"
    >
      <button className="getLocation" onClick={getPosition}>
        {isLoading ? "Loading ..." : "Use your location"}
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DetectClick />
      <ChangeCenter position={mapCenter} />
      {hotels.map((item) => {
        return (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const Map = useMap();
  Map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark?lat=${e.latlng?.lat}& lng=${e.latlng?.lng}`),
  });
  return null;
}
