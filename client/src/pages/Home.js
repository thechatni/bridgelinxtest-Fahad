import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav-bar";

const Home = () => {
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
    setPage(1);
  };

  const nextPage = () => {
    console.log("next");
    setPage((page) => eval(page) + eval(1));
  };

  const prevPage = () => {
    console.log("previous");
    setPage((page) => page - 1);
  };

  const paginate = () => {
    var arr = [];

    for (let i = 1; i <= total; i++) {
      arr[i - 1] = i;
    }
    setPageNumbers(arr);
  };
  const makeFetch = (url, abortCont) => {
    let unmount = false;
    fetch(url, {
      signal: abortCont.signal,
      method: "GET",
    })
      .then((res) => {
        if (!unmount) {
          return res.json();
        }
      })
      .then((data) => {
        setData(data.Search);
        setTotal(Math.ceil(data.totalResults / 10));
        setPending(false);
        setError(false);
      })
      .catch((err) => {
        if ((err.name = "AbortError")) {
          console.log("Fetch aborted");
          setError(true);
          setPending(false);
        }
      });
  };

  useEffect(() => {
    if (total !== undefined) {
      paginate();
    }

    setCur(page);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const abortCont = new AbortController();
    makeFetch(
      `http://www.omdbapi.com/?s=${search}&page=${page}&apikey=ba273f35`,
      abortCont
    );

    return () => abortCont.abort();
  }, [search, page, total]);

  return (
    <>
      <Navbar back={false} />
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
            {pending && (
              <h1
                style={{
                  color: "wheat",
                  textAlign: "center",
                  fontFamily: "'Anton', sans-serif",
                  marginTop: "30px",
                }}
              >
                Loading
              </h1>
            )}

            {error && (
              <h1
                style={{
                  color: "crimson",
                  textAlign: "center",
                  fontFamily: "'Anton', sans-serif",
                  marginTop: "30px",
                }}
              >
                An error occured while fetching data.
              </h1>
            )}

            {data === undefined && !error && (
              <h1
                style={{
                  color: "coral",
                  textAlign: "center",
                  fontFamily: "'Anton', sans-serif",
                  marginTop: "30px",
                }}
              >
                No movies found with entered title.
              </h1>
            )}

            {!pending &&
              !error &&
              data !== undefined &&
              data.map((movie) => (
                <Col
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex justify-content-center"
                  key={movie.imdbID}
                >
                  <div id="movie">
                    <Link to={`/movie/${movie.imdbID}`}>
                      {(movie.Poster === "N/A" && (
                        <img id="poster" src="noimage.png" alt="poster"></img>
                      )) || (
                        <img id="poster" src={movie.Poster} alt="poster"></img>
                      )}

                      <p>{movie.Title}</p>
                    </Link>
                  </div>
                </Col>
              ))}
          </Row>
          {!pending && !error && data !== undefined && (
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
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
