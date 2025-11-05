import { useEffect, useState } from "react";

export function useFectch(baseUrl, initType){

    const [data, setData] = useState(null);

    const fetchUrl = (type) =>{
      fetch(baseUrl + "/" + type)
      .then((res)=> res.json())
      .then((data)=>setData(data));
    };

    useEffect(() =>{
        fetchUrl(initType)
    }, []); //한번만   [] 

    return {data, fetchUrl};
}