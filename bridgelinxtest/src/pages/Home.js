import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
    for (var k = 0; k < limit; k++) {
      pageNumbers.pop(k);
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
        paginate(Math.ceil(data.totalResults / 10));
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [search, page, total]);

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center" id="search">
          <Col className="col-12 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <input
                id="searchInput"
                type="text"
                value={input}
                placeholder="Enter title"
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button id="searchButton" type="submit">
                Search
              </button>
            </form>
          </Col>
        </Row>
        <Row className="justify-content-center" id="results">
          {data != undefined &&
            data.map((movie) => (
              <Col
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex justify-content-center"
                key={movie.imdbID}
              >
                <div id="movie">
                  <Link to={`/movie/${movie.imdbID}`}>
                    {(movie.Poster === "N/A" && (
                      <img id="poster" src="noimage.png"></img>
                    )) || <img id="poster" src={movie.Poster}></img>}

                    <p>{movie.Title}</p>
                  </Link>
                </div>
              </Col>
            ))}
        </Row>
        <Row className="justify-content-center" id="pagination">
          <Col className="col-12 d-flex justify-content-center">
            {page > 1 && (
              <p id="prev" onClick={prevPage}>
                Previous
              </p>
            )}
            <select value={cur} onChange={(e) => setPage(e.target.value)}>
              {pageNumbers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            {page < total && (
              <p id="next" onClick={nextPage}>
                Next
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
