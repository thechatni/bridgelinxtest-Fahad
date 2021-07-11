import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [reviews, setReviews] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setReviews(response.data);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  return { reviews, ready };
};

export default useFetch;
