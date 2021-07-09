import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  const makeFetch = (url) => {
    const abortCont = new AbortController();

    fetch(url, {
      signal: abortCont.signal,
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setMovie(data);
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
    makeFetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=ba273f35`);
    if (movie != undefined) {
      setPending(false);
    }
  }, [movie]);

  return (
    <>
      {!pending && (
        <div>
          <p>{movie.Title}</p>
          <p>{movie.Year}</p>
          <p>{movie.Type}</p>
          <img src={movie.Poster}></img>
        </div>
      )}
    </>
  );
};

export default Movie;
