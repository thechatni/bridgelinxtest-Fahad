import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateReview = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(3);
  const [description, setDescription] = useState("");
  const [ratingError, setRatingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(parseInt(number))) {
      setRatingError(true);
    } else {
      setRatingError(false);

      const review = {
        name: name,
        number: parseInt(number),
        description: description,
        imdbId: props.imdbId,
      };

      axios.post("http://localhost:5000/reviews/add", review).then(
        (res) => console.log(res.data)
        // props.getAdded(true)
      );

      setName("");
      setNumber(0);
      setDescription("");

      window.scroll({
        bottom: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="create">
      <Container>
        <h1 className="text-center">Add your review</h1>

        <Form id="reviewForm" onSubmit={handleSubmit}>
          <Row>
            <Form.Group>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />

              <Form.Text className="text-muted">
                The name you want to be displayed with the review.
              </Form.Text>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group>
              <div id="rating">
                <Form.Text className="text-muted">
                  Your rating out of 5:
                </Form.Text>

                <div id="radio" onChange={(e) => setNumber(e.target.value)}>
                  <input type="radio" value={1} name="gender" /> 1
                  <input type="radio" value={2} name="gender" /> 2
                  <input
                    type="radio"
                    value={3}
                    name="gender"
                    defaultChecked={true}
                  />{" "}
                  3
                  <input type="radio" value={4} name="gender" /> 4
                  <input type="radio" value={5} name="gender" /> 5
                </div>
              </div>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter review description"
                required
              />
              <Form.Text className="text-muted">
                Type a short description of the review.
              </Form.Text>
            </Form.Group>
          </Row>

          <Row className="justify-content-center">
            <Col className="d-flex justify-content-center col-12">
              <Form.Group>
                <Form.Control
                  id="subReview"
                  type="submit"
                  value="Submit Review"
                  className="btn btn-info btn-lg mb-3"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CreateReview;
