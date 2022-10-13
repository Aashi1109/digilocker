const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  first: String,
  middle: String,
  last: String,
  joinDate: { type: Date, default: Date.now },
  leaveDate: { type: Date },
  isActive: String,
  image: String,
  address: String,
  city: String,
  state: String,
  country: String,
});

const Customer = new mongoose.model("Customer", customerSchema);

module.exports = { Customer };
