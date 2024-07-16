const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

async function getUserToken(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.json({ msg: "check your credentials 1..." });

    const match = await bcrypt.compare(req.body.password, user.password); //devuelve true or false
    if (!match) return res.json({ msg: "check your credentials 2..." });

    const token = jwt.sign(
      { sub: user.id, email: user.email, isAdmin: false },
      process.env.SECRET_JWT
    );
    const { firstname, lastname, email } = user;
    res.json({ token, firstname, lastname, email });
  } catch (error) {
    res.json({ msg: "Error en el token", error });
  }
}

async function getAdminToken(req, res) {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } });
    if (!admin) return res.json({ msg: "check your credentials 1..." });

    const match = await bcrypt.compare(req.body.password, admin.password); //devuelve true or false
    if (!match) return res.json({ msg: "check your credentials 2..." });

    const token = jwt.sign(
      { sub: admin.id, isAdmin: true },
      process.env.SECRET_JWT
    );
    const { email,id } = admin;
    res.json({ token, email, id });
  } catch (error) {
    res.json({ msg: "Error en el token", error });
  }
}

module.exports = { getUserToken, getAdminToken };
