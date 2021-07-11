const router = require("express").Router();
let Review = require("../models/review.model");

router.route("/").get((req, res) => {
  Review.find()
    .then((reviews) => res.json(reviews))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const number = Number(req.body.number);
  const imdbId = req.body.imdbId;
  const description = req.body.description;

  const newReview = new Review({
    name,
    number,
    description,
    imdbId,
  });

  newReview
    .save()
    .then(() => res.json("Review added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").get((req, res) => {
//   Review.findById(req.params.id)
//     .then((review) => res.json(review))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/movie/:imdbId").get((req, res) => {
  Review.find({ imdbId: req.params.imdbId })
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json("Review deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/update/:id").post((req, res) => {
//   Review.findById(req.params.id)
//     .then((review) => {
//       review.title = req.body.title;
//       review.netflixid = Number(req.body.netflixid);
//       review.username = req.body.username;
//       review.pass = req.body.pass;
//       review.date = Date.parse(req.body.date);
//       review.people = Number(req.body.people);
//       review.duration = Number(req.body.duration);
//       review.language = req.body.language;
//       review.country = req.body.country;
//       review.note = req.body.note;

//       review
//         .save()
//         .then(() => res.json("Review updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
