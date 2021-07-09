import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([1, 2, 3]);
  const [page, setPage] = useState(1);
  const [cur, setCur] = useState(1);
  const [pending, setPending] = useState(true);
  const [total, setTotal] = useState();
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const [search, setSearch] = useState("Avengers");
  const [error, setError] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearch(input);
  };

  const nextPage = () => {
    console.log("next");
    setPage((page) => page + 1);
  };

  const prevPage = () => {
    console.log("previous");
    setPage((page) => page - 1);
  };

  const paginate = (limit) => {
    console.log(limit);
    for (var k = 1; k <= pageNumbers.length; k++) {
      pageNumbers.pop();
    }
    for (var i = 1; i <= limit; i++) {
      pageNumbers.push(i);
    }
  };
  const makeFetch = (url) => {
    console.log(page);
    const abortCont = new AbortController();

    fetch(url, {
      signal: abortCont.signal,
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.Search);
        setTotal(Math.ceil(data.totalResults / 10));
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
    makeFetch(
      `http://www.omdbapi.com/?s=${search}&page=${page}&apikey=ba273f35`
    );
    setCur(page);
    paginate(total);
  }, [search, page, total]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      {data != undefined &&
        data.map((movie) => (
          <div key={movie.imdbID} id="movie">
            {/* <Link to={`/movie/${movie.imdbID}`}> */}
            <img id="poster" src={movie.Poster}></img>
            <p>{movie.Title}</p>
            {/* </Link> */}
          </div>
        ))}
      {page > 1 && <div onClick={prevPage}>Previous</div>}
      {/* <select value={cur} onChange={(e) => setPage(e.target.value)}>
        {pageNumbers.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select> */}
      {page < total && <div onClick={nextPage}>Next</div>}
      {/* {console.log(data)} */}
    </div>
  );
};

export default Home;
