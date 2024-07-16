const { Product, Category, Sequelize } = require("../models");

const ProductController = {
  index: async (req, res) => {
    try {
      const products = await Product.findAll({
        order: [["name", "ASC"]],
      });
      res.json(products);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the products" });
    }
  },
  store: async (req, res) => {
    const { name, description, price, image, categoryId } = req.body;
    try {
      const newProduct = await Product.create({
        name,
        description,
        price,
        image,
        categoryId,
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
        include: [
          {
            model: Category,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
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
      await Product.update(req.body, { where: { id } });
      const product = await Product.findByPk(id);
      res.json(product);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to update the product" });
    }
  },

  updateStock: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const product = await Product.findByPk(id);
      if (product) {
        product.stock -= quantity;
        await product.save();
        res.json({ message: "Stock updated successfully", product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to update the stock" });
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
