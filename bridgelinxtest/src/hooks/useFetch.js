import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const abortCont = new AbortController();
  useEffect(() => {
    fetch(url, {
      signal: abortCont.signal,
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.Search);
        setData(data.Search);
      })
      .catch((err) => {
        if ((err.name = "AbortError")) {
          console.log("Fetch aborted");
          setError(true);
        }
      });

    return () => abortCont.abort();
  }, []);
  return { data, error };
};

export default useFetch;
