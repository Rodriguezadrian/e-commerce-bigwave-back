const { Order } = require("../models");
const { User } = require("../models");
const { Product } = require("../models");

const OrderController = {
  index: async (req, res) => {
    try {
      const order = await Order.findAll({ include: [{ model: User }] });
      res.json(order);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the orders" });
    }
  },
  store: async (req, res) => {
    const { status, address, products, totalAmount } = req.body;
    try {
      const newOrder = await Order.create({
        status,
        address,
        products: products.map((product) => ({
          name: product.name,
          price: product.price,
          categoryId: product.categoryId,
          id: product.id,
          quantity: product.quantity,
          image: product.image,
        })),
        totalAmount,
        UserId: req.auth.sub,
      });
      res.json(newOrder);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to create the order" });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findOne({
        where: { id },
      });
      res.json(order);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the order" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      await Order.update(req.body, { where: { id } });
      const order = await Order.findByPk(id);
      res.json(order);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to update the order" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.destroy({ where: { id } });
      res.json({ msg: "Order deleted" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to delete the order" });
    }
  },
};
module.exports = OrderController;
