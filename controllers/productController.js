const Product = require("../models/Product");

const ProductController = {
  index: (req, res) => {
    res.send("Product Index");
  },
  store: (req, res) => {
    res.send("Product Store");
  },
  show: (req, res) => {
    res.send("Product Show");
  },
  update: (req, res) => {
    res.send("Product Update");
  },
  destroy: (req, res) => {
    res.send("Product Destroy");
  },
};
module.exports = ProductController;
