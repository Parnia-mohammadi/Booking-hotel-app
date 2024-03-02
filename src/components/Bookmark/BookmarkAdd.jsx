import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loading from "../LocationList/Loading";
import { UseBookmarks } from "../../context/BookmarkListContext";

const Base_GeoCoding_Url =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function BookmarkAdd() {
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const { createBookmark } = UseBookmarks();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    };
    await createBookmark(newBookmark);
  };
  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${Base_GeoCoding_Url}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "this place is not a country or city please click somewhere else."
          );

        setCountry(data.countryName);
        setCityName(data.city || data.locality || "");
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loading />;
  return (
    <div>
      <h2>Bookmark new Location :</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="country">Country :</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="formControl">
          <label htmlFor="cityName">CityName :</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default BookmarkAdd;
