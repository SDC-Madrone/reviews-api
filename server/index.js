const express = require("express");
const controllers = require("./controllers.js");
const app = express();
const PORT = 4000;
require("dotenv").config();

app.use(express.json());
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Invalid endpoint. Please specify /reviews in your path");
});
app.get("/reviews", controllers.handleGetReviews);
app.post("/reviews", controllers.handlePostReviews);

// production port - comment out lines 15-17 to allow jest-supertest to run
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
