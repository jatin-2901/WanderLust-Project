const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

const initData = require("./data.js"); // exports sampleListings directly
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_BOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

let mongoUrl = "mongodb://127.0.0.1:27017/wanderLust";

async function main() {
  await mongoose.connect(mongoUrl);
  console.log("Connected to DB");
  await initDB();
  await mongoose.connection.close();
  console.log("Database connection closed");
}

async function initDB() {
  // 1. Wipe existing listings
  // await Listing.deleteMany({});
  // console.log("Cleared old listings");

  // 2. Attach fallback geocoding if ever missing
  const updatedData = await Promise.all(
    initData.map(async (obj) => {
      let geometry = obj.geometry;

      // Only hit Mapbox if geometry coordinates are absent
      if (!geometry || !geometry.coordinates || geometry.coordinates.length === 0) {
        const response = await geocodingClient
          .forwardGeocode({
            query: `${obj.location}, ${obj.country}`,
            limit: 1,
          })
          .send();

        geometry = response.body.features[0]?.geometry || {
          type: "Point",
          coordinates: [0, 0],
        };
      }

      return {
        ...obj,
        geometry,
      };
    })
  );

  // 3. Batch insert into MongoDB
  await Listing.insertMany(updatedData);
  console.log("Data is Initialized");
}

main().catch((err) => {
  console.log("Error:", err);
});