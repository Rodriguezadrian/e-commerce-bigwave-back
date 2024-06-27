const { User } = require("../models");

const userController = {
  index: (req, res) => {
    res.send("User Index");
  },
  store: (req, res) => {
    res.send("User Store");
  },
  show: (req, res) => {
    res.send("User Show");
  },
  update: (req, res) => {
    res.send("User Update");
  },
  destroy: (req, res) => {
    res.send("User Destroy");
  },
};
module.exports = userController;
