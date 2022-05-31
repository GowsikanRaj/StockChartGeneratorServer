const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const watchlist = require("./StockWatchList");

const app = express();
app.use(cors);
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

const port = process.env.PORT || 3001;

const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then(
    app.listen(port, () => {
      console.log("Yay, your server is running on port " + port);
    })
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/getWatchlist", (req, res) => {
  watchlist
    .find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.post("/deleteStock", (req, res) => {
  watchlist
    .deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.post("/addStock", (req, res) => {
  const newStock = new watchlist({ Stock: req.body.Stock });
  newStock
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
