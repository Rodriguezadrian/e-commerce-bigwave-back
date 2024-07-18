const { Category } = require("../models");
const { Product } = require("../models");

const categoryController = {
  index: async (req, res) => {
    try {
      const { sortBy, order } = req.query;
      const categories = await Category.findAll({
        order: [[sortBy || "id", order || "DESC"]],
      });
      res.json(categories);
    } catch {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the categories" });
    }
  },

  store: (req, res) => {
    try {
      const { name, description, image } = req.body;
      const newCategory = Category.create({ name, description, image });
      res.json({ msg: `${name} created succesfully` });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to create the category" });
    }
  },

  show: async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await Category.findOne({
        where: { slug: slug },
        include: [{ model: Product }],
        order: [[{ model: Product }, "name", "ASC"]],
      });
      res.json(category);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the product" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCategory = await Category.update(req.body, {
        where: { id },
      });
      res.json(updatedCategory);
    } catch (err) {
      console.error(err);
      res.json({
        message: "There was a problem trying to update the category",
      });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.destroy({ where: { id } });
      res.json({ msg: "Category deleted", category });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to delete the category" });
    }
  },
};
module.exports = categoryController;
