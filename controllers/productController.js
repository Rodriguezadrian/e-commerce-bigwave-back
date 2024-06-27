const Product = require("../models/Product");

const ProductController = {
  index: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the products" });
    }
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
