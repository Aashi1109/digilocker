const mongoose = require("mongoose");
const { Schema } = mongoose;

const configSchema = Schema({
  i: Number,
});

const Config = new mongoose.model("Config", configSchema);

module.exports = { Config };
