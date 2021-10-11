const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: true },
  provider: { type: String, required: true },
  locale: { type: String, required: true },
  picture: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
