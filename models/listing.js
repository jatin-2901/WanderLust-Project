const mongoose = require("mongoose");
const Review = require("./review.js")

let Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingImage",
    },
    url: {
      type: String,
      default:
        "https://www.investopedia.com/thmb/wM0mc-JWYUPYvs8e3orlHT9Je2Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1470433685-a17018ee8ab849deb69b0667da921916.jpg",
      set: (v) =>
        v === ""
          ? "https://www.investopedia.com/thmb/wM0mc-JWYUPYvs8e3orlHT9Je2Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1470433685-a17018ee8ab849deb69b0667da921916.jpg"
          : v,
    },
  },
  price: {
    type : Number,
    min : 500
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  category : {
      type : String,
      enum : ["room", "arctic", "farms", "photography", "beach", "cabins", "castles", "yacht", "domes", "monuments" ]
  }
});

listingSchema.post("findOneAndDelete", async(listing) => {
 if(listing) {
   await Review.deleteMany({_id : {$in : listing.reviews}});
 }
});

let Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
