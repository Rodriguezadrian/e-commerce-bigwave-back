const Order = require("../models/Order");

const OrderController = {
  index: (req, res) => {
    res.send("Order Index");
  },
  store: (req, res) => {
    res.send("Order Store");
  },
  show: (req, res) => {
    res.send("Order Show");
  },
  update: (req, res) => {
    res.send("Order Update");
  },
  destroy: (req, res) => {
    res.send("Order Destroy");
  },
};
module.exports = OrderController;
