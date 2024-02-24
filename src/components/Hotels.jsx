import { Link, Outlet, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./LocationList/Loading";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const { room } = JSON.parse(searchParams.get("options"));
  // console.log(room);
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  console.log(isLoading, data);
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
