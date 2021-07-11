import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateReview from "../components/CreateReview";
import Navbar from "../components/Nav-bar";

const Movie = () => {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState();
  const [pending, setPending] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(true);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (movie !== undefined) {
      setPending(false);
    }
    const abortCont = new AbortController();

    axios
      .get(`http://localhost:5000/reviews/movie/${imdbId}`, {})
      .then((response) => {
        setReviews(response.data);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
      });

    if (start) {
      fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=ba273f35`, {
        signal: abortCont.signal,
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMovie(data);
        })
        .catch((err) => {
          console.log(err.name);
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          }
        });
      setStart(false);
    }

    return () => abortCont.abort();
  }, [movie, trigger]);

  return (
    <>
      <Navbar back={true} />
      <Container>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center">
            <h1 id="movieHeading">Movie Details</h1>
          </Col>
        </Row>
        {(!pending && (
          <div id="details">
            <Row className="justify-content-center" id="allDetails">
              <Col className="d-flex justify-content-center">
                <img
                  id="detailPoster"
                  src={movie.Poster}
                  alt="Detailed Poster"
                ></img>
              </Col>
              <Col id="movieInfo">
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
        )) || (
          <h1
            style={{
              color: "coral",
              textAlign: "center",
              fontFamily: "fantasy",
              marginTop: "30px",
            }}
          >
            Loading
          </h1>
        )}
        {!pending && (
          <CreateReview
            imdbId={imdbId}
            newReview={(total) => setTrigger(total)}
          />
        )}

        {(ready && !pending && (
          <div id="allReviews">
            <h1 className="text-center">All Reviews for this title</h1>
            <Row className="justify-content-around">
              {reviews.length === 0 && <p id="none">No reviews found.</p>}
              {ready &&
                reviews.map((review) => (
                  <Col
                    key={review._id}
                    className="col-md-4 col-sm-6 col-xs-12 mt-5"
                  >
                    <Card id="reviewCard">
                      <Card.Body>
                        <Card.Text>
                          <span id="headings">Name:</span> {review.name}
                        </Card.Text>
                        <Card.Text>
                          <span id="headings">Rating:</span> {review.number}
                        </Card.Text>
                        <Card.Text>
                          <span id="headings">Description:</span>{" "}
                          {review.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        )) || (
          <h1
            style={{
              color: "coral",
              textAlign: "center",
              fontFamily: "fantasy",
              marginTop: "30px",
            }}
          >
            Loading Reviews
          </h1>
        )}
      </Container>
    </>
  );
};

export default Movie;
