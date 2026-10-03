const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const wrapAsync = require("../util/wrapAsync.js");
const { reviewValidator, isLoggedIn, isReviewOwner } = require("../util/middleware.js");
const { reviewSchema } = require("../schema.js");

const reviewController = require("../controllers/reviews.js")

// Review
// post  review Route
router.post(
  "/",
  isLoggedIn,
  reviewValidator,
  wrapAsync(reviewController.createReview)
);

// delete review route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
