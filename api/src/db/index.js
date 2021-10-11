const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE_DEV_URL;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
