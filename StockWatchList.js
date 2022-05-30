const mongoose = require("mongoose");

const stockWatchlistSchema = new mongoose.Schema({
  Stock: {
    type: String,
    required: true,
  },
});

stockWatchlistSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("StockWatchlist", stockWatchlistSchema);
