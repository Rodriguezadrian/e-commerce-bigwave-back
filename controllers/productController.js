const { Product, Category, Sequelize } = require("../models");
const uploadFile = require("../middlewares/fileUploader");
const formidable = require("formidable");

const ProductController = {
  index: async (req, res) => {
    try {
      const { sortBy, order } = req.query;
      const products = await Product.findAll({
        order: [[sortBy || "name", order || "ASC"]],
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
    const { name, description, price, categoryId, stock, netWeight } =
      req.fields;

    try {
      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        image: `${process.env.SUPABASE_IMAGES_URL}${req.uploadedFile.fullPath}`,
        netWeight,
        categoryId,
      });
      res.json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "There was a problem trying to create the product",
      });
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
  uploadImage: async (req, res) => {
    try {
      const productId = req.params.id;
      await Product.update(
        { image: req.uploadedFile.Key },
        { where: { id: productId } }
      );
      res.status(200).json({ data: req.uploadedFile });
    } catch (error) {
      console.error("Error updating product image:", error);
      res.status(500).json({ error: error.message });
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
