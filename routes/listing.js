const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const wrapAsync = require("../util/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, listingValidator, locationCoordinates } = require("../util/middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudeConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
 .post(
    isLoggedIn,
    upload.single("listing[image][url]"),
    listingValidator,
    wrapAsync(listingController.createListing),
  );

  

router.get("/new", isLoggedIn, listingController.renderCreateForm);


router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .patch(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    listingValidator,
    wrapAsync(listingController.editListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

 
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

router
  .route("/filter/:filter")
  .get(isLoggedIn, wrapAsync(listingController.filterListings));

module.exports = router;
