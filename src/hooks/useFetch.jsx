import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, query) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  //   console.log(url);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, query]);
  return { isLoading, data };
}
