const { Admin } = require("../models");

const adminController = {
  index: async (req, res) => {
    try {
      const admins = await Admin.findAll();
      res.json(admins);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the admins" });
    }
  },
  store: async (req, res) => {
    const { email, password } = req.body;
    try {
      const newAdmin = await Admin.create({
        email,
        password,
      });
      res.json(newAdmin);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to create the admin" });
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Admin.findOne({
        where: { id },
      });
      res.json(admin);
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
      const admin = await Admin.update(req.body, { where: { id } });
      res.json({ msg: "admin updated" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to update the admin" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await Admin.destroy({ where: { id } });
      res.json({ msg: "Admin deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem trying to delete the admin" });
    }
  },
};
module.exports = adminController;
