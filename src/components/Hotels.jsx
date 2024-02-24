import { Outlet, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./LocationList/Loading";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const { room } = JSON.parse(searchParams.get("options"));
  // console.log(room);
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room ||1}`
  );
  console.log(isLoading,data);
  if (isLoading) <Loading />;

  return (
    <div>
      {data.length}
    </div>
  );
}

export default Hotels;
