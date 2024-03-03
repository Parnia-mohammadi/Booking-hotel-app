import { useEffect } from "react";
import { useHotels } from "../context/HotelsProvider";
import Loading from "./LocationList/Loading";
import { useParams } from "react-router-dom";

function SingleHotel() {
  const { isLoadingCurrentHotel, currentHotel: data, getHotel } = useHotels();
  const { id } = useParams();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingCurrentHotel || !data) return <Loading />;
  return (
    <div classsName="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} reviews &bull; {data.smart_location}
        </div>
        <img src={data.picture_url.url} alt={data.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
