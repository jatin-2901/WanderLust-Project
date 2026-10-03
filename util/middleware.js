const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("./ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You are not Logged In ");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports.saveRedirectUrl = (req, res, next) => {
  res.locals.redirectUrl = req.session.redirectUrl;
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listings = await Listing.findById(id);
  if(listings) {
     if (!res.locals.currUser._id.equals(listings.owner._id)) {
    req.flash(
      "error",
      "You dont't have Permission to Perform this action to this listing",
    );
    res.redirect(`/listings/${id}`);
  } else {
    next();
  }
  } else {
    req.flash("error", "listing You requested for doesn't Exits");
    res.redirect("/listings");
  }
 
};

module.exports.listingValidator = (req, res, next) => {
  // middleware for validating req.body
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.reviewValidator = (req, res, next) => {
  // middleware for validating req.body
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

module.exports.isReviewOwner = async (req, res, next) => {
  let {reviewId, id } = req.params;
  let review = await Review.findById(reviewId);
  if (!res.locals.currUser._id.equals(review.author)) {
    req.flash(
      "error",
      "You are not author or this Review",
    );
    res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};


