const models = require("./models.js");
const transformers = require("./transformers.js");
const { isValidRequest } = require("./validateRequest.js");
const controllers = {
  handleGetReviews: function (req, res) {
    if (req.query.product_id === undefined) {
      console.log(`GET | res 400`);
      res.status(400).send('Bad request: Need query parameter "product_id"');
    } else {
      req.query.page = req.query.page || 0;
      req.query.count = req.query.count || 5;
      req.query.sort = req.query.sort || "none";

      models
        .getReviews(req.query)
        .then(([rows, fields]) => {
          var responseObject = transformers.reviews(rows, req.query);
          res.status(200).send(responseObject);
        })
        .catch((err) => {
          console.error(`GET | product_id: ${req.query.product_id} | res 404`);
          res.status(404).send(err);
        });
    }
  },

  handlePostReviews: function (req, res) {
    if (!isValidRequest(req.body)) {
      console.error("POST | res 400");
      res.status(400).send("Missing body parameters");
    } else {
      models
        .postReviews(req.body)
        .then(() => {
          console.log("POST | res 201 (added to database)");
          res.status(201).send("Added review");
        })
        .catch((err) => {
          console.error("POST | res 400");
          res.status(400).send(err);
        });
    }
  },
};

module.exports = controllers;
