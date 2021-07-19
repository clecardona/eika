
import React,{useEffect,useState} from "react";
import AppFunctions from "../services/AppFunctions";


export default function useFetch(reload){

// STATES
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await AppFunctions.getSavedListInLocalStorage();
        setData(response);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    //setTimeout(()=> init(),3000)
    init()
  }, [reload]);

return {data,error,loading}

}