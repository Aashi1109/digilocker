const mongoose = require("mongoose");

const { Schema } = mongoose;

const loggingSchema = new Schema({
  lockerid: String,
  date: Date.now(),
});

const Logging = new mongoose.model("Logging", loggingSchema);

module.exports = { Logging };
