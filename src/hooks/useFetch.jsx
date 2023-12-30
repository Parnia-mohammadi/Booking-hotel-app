import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useFetch({url, query}){
    const [isLoading, setIsLoading]= useState(false);
    const [data, setData]= useState([]);
    useEffect(()=>{
        async function fetchData(){
            try{
                setIsLoading(true);
                const {data} = axios.get(`${url}?${query}`);
                setData(data);
        }
            catch(err){toast.err(err?.message)}
            finally{
                setIsLoading(false);
            }
        }
        fetchData();
    },[url, query])
    return({isLoading, data});
}