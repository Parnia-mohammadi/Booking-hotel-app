import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "../hooks/useGeoLocation";
import useUrlLocation from "../hooks/useUrlLocation";

function Map({ markerLocations }) {
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  // console.log(hotels);
  const [mapCenter, setMapCenter] = useState([48.56, 2.35]);
  const [lat, lng] = useUrlLocation();
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition?.lat, geoLocationPosition?.lng]);
  }, [geoLocationPosition]);
  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="map mapContainer"
    >
      <button className="getLocation" onClick={getPosition}>
        {isLoadingPosition ? "Loading ..." : "Use your location"}
      </button>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeCenter position={mapCenter} />
      <DetectClick />
      {markerLocations.map((item) => {
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
      navigate(`/bookmarks/add?lat=${e.latlng?.lat}&lng=${e.latlng?.lng}`),
  });
  return null;
}
