import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateReview = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(1);
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
      <h1 className="text-center">Add Review for this title</h1>

      <Form id="reviewForm" onSubmit={handleSubmit}>
        <Form.Group className="mt-2">
          <Form.Label>Name: </Form.Label>
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

        <Form.Group className="mt-2">
          <Form.Label>Rating: </Form.Label>
          <Form.Control
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Type your rating out of 10"
          />
          <Form.Text className="text-muted">Your rating.</Form.Text>
          {ratingError && <p>Please enter a number not a string</p>}
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Description: </Form.Label>
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
        <Form.Group className="mt-2">
          <Form.Control
            type="submit"
            value="Submit Review"
            className="btn btn-info btn-lg mb-3"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateReview;
