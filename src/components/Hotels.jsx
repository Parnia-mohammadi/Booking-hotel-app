import { Link } from "react-router-dom";
import Loading from "./LocationList/Loading";
import { UseHotels } from "../context/HotelsProvider";

function Hotels() {
  const { isLoading, data } = UseHotels();
  // console.log(isLoading, data);
  if (isLoading) <Loading />;

  return (
    <div classsName="searchList">
      <h2>search Reasult ({data.length})</h2>
      <br />
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`hotels/${item.id}?lat=${item.latitude}&
         lng=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  &euro;&nbsp;{item.price}&nbsp;<span>per night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
