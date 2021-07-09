import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      {console.log(movie)}
      <Container>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center">
            <h1 id="movieHeading">Movie Details</h1>
          </Col>
        </Row>
        {!pending && (
          <div id="details">
            <Row className="justify-content-center" id="allDetails">
              <Col className="d-flex justify-content-center">
                <img id="detailPoster" src={movie.Poster}></img>
              </Col>
              <Col>
                <p>
                  <span id="movieTitle">Title: </span> {movie.Title}
                </p>
                <p>
                  <span>Year: </span> {movie.Year}
                </p>
                <p>
                  <span>Type: </span> {movie.Type}
                </p>
                <p>
                  <span>Language: </span> {movie.Language}
                </p>
                <p>
                  <span>Genre: </span> {movie.Genre}
                </p>
                <p>
                  <span>Plot: </span> {movie.Plot}
                </p>
                <p>
                  <span>Rating: </span> {movie.imdbRating}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
};

export default Movie;
