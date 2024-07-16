const { User, Order } = require("../models");
// const formidable = require("formidable");
const bcrypt = require("bcrypt");

const userController = {
  index: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the users" });
    }
  },
  store: async (req, res) => {
    try {
      const { email, password, firstname, lastname, avatar } = req.body;
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const newUser = User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
      });
      res.json({ msg: `${firstname}'s user created successfully` });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to create the user" });
    }
  },
  showMyProfile: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { email: req.auth.email },
        attributes: { exclude: ["password"] },
        include: [
          { model: Order, separate: true, order: [["createdAt", "DESC"]] },
        ],
      });
      res.json(user);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the user" });
    }
  },
  showClient: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] },
      });
      res.json(user);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to get the user" });
    }
  },
  updateMyProfile: async (req, res) => {
    try {
      if (req.body.password === undefined) {
        const user = User.update(req.body, {
          where: { email: req.auth.email },
        });
        res.json({ msg: `user updated successfully 1` });
      } else {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

        const user = User.update(
          { ...req.body, password: hashedPassword },
          {
            where: { email: req.auth.email },
          }
        );
        res.json({ msg: `user updated successfully 2` });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to update the user" });
    }
  },
  destroyMyProfile: async (req, res) => {
    try {
      const anonymous = 1;
      const updateOrder = await Order.update(
        { UserId: anonymous },
        { where: { UserId: req.auth.sub } }
      );
      const user = await User.destroy({ where: { id: req.auth.sub } });
      res.json({ message: "User profile deleted and orders reassigned" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to delete the user" });
    }
  },
  destroyClient: async (req, res) => {
    try {
      const user = await User.destroy({ where: { email: req.body.email } });
      res.json({ msg: `user deleted successfully` });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "There was a problem trying to delete the user" });
    }
  },
};
module.exports = userController;
