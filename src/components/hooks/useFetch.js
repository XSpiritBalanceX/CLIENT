import { useEffect, useState } from "react";

export default function useFetch(url){

    const [data, setData]=useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        (async function(){
            try{
                
                const response = await fetch(url);
                const getData= await response.json();
                setData(getData);
                setLoading(true)
            }catch(err){
                setError(err)
            }
        })()
    },[url])
    return {data, error, loading}
}