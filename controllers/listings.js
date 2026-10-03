const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_BOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index 
module.exports.index = async (req, res, next) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

//create form
module.exports.renderCreateForm = (req, res, next) => {
  res.render("listings/new.ejs");
};

//create listing
module.exports.createListing = async (req, res, next) => {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error);
  }

  let location = req.body.listing.location;
  let country = req.body.listing.country;
  let mapLocation = `${location}, ${country}`;

  let response = await geocodingClient.forwardGeocode({
  query: mapLocation,
  limit: 1
})
  .send()

  let newListings = new Listing(req.body.listing);
  newListings.owner = req.user._id;

  newListings.image.url = req.file.path;
  newListings.image.filename = req.file.filename;
  newListings.geometry = response.body.features[0].geometry;
  console.log(newListings);
  await newListings.save();
  req.flash("success", "Listing Created");
  res.redirect("/listings");
};

//show for specific
module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  let listings = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Listing You requested for does not Exits");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { listings});
  }
};

//edit form
module.exports.renderEditForm = async (req, res, next) => {
  let { id } = req.params;
  let listings = await Listing.findById(id);
  if (!listings) {
    req.flash("error", "Listing You requested for does not Exits");
    res.redirect("/listings");
  } 
    let originalListingUrl = listings.image.url;
    originalListingUrl = originalListingUrl.replace("/upload", "/upload/w_300,c_scale,q_auto:low,f_auto");
    res.render("listings/edit.ejs", { listings, originalListingUrl });
  
};

//edit listing
module.exports.editListing = async (req, res, next) => {
 let { id } = req.params;

 let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

 if(req.file) {
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url, filename}
  await listing.save();
 }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

//delete listing
module.exports.deleteListing = async (req, res, next) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};


module.exports.filterListings = async(req, res, next) => {
  let {filter} = req.params;
  let allListings = await Listing.find({category : filter});
  if(!allListings.length) {
      req.flash("error", "Sorry, No Airbnb Available")
      res.redirect("/listings");
  } else {
   res.render("listings/filter.ejs", { allListings });
  }
  
}