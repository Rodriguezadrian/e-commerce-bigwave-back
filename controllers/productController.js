const { Product, Category } = require("../models");

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
  store: async (req, res) => {
    const { name, description, price, image } = req.body;
    try {
      const newProduct = await Product.create({
        name,
        description,
        price,
        image,
      });
      res.json(newProduct);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to create the product" });
    }
  },
  show: async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: { slug },
        include: [{ model: Category }],
      });
      res.json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the product" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.update(req.body, { where: { id } });
      res.json(product);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to update the product" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.destroy({ where: { id } });
      res.json({ msg: "Product deleted" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to delete the product" });
    }
  },
};
module.exports = ProductController;
