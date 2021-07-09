import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [error, setError] = useState(false);

  const makeFetch = (url) => {
    const abortCont = new AbortController();

    fetch(url, {
      signal: abortCont.signal,
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovie(data.Search);
      })
      .catch((err) => {
        if ((err.name = "AbortError")) {
          console.log("Fetch aborted");
          setError(true);
        }
      });

    return () => abortCont.abort();
  };

  useEffect(() => {
    // makeFetch(`http://www.omdbapi.com/?i=${id}&apikey=ba273f35`);
  }, []);

  return (
    <>
      {/* {movie != undefined && (
        <div>
          <p>{movie.Title}</p>
          <p>{movie.Year}</p>
          <p>{movie.Type}</p>
          <img src={movie.Poster}></img>
        </div>
      )} */}
    </>
  );
};

export default Movie;
