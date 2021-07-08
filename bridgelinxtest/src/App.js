import "./App.css";
import { useState, useEffect } from "react";
import Movie from "./components/Movie";
import useFetch from "./hooks/useFetch";

function App() {
  const [movies, setMovies] = useState([1, 2, 3]);
  const [pending, setPending] = useState(true);

  const { data, error } = useFetch(
    "http://www.omdbapi.com/?s=avengers&page=1&apikey=ba273f35"
  );

  // setMovies(data);
  // useEffect(() => {
  //   setMovies(data);

  //   if (data != undefined) {
  //     setPending(false);
  //   }
  // }, [data]);

  return (
    <div className="App">
      {data != undefined &&
        data.map((movie) => (
          <div key={movie.imdbID} id="movie">
            <img id="poster" src={movie.Poster}></img>
            <p>{movie.Title}</p>
          </div>
        ))}
      {/* {console.log(data)} */}
    </div>
  );
}

export default App;
