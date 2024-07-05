const { Sequelize } = require("sequelize");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Category = require("./Category");
const Admin = require("./Admin");

const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
};

if (process.env.DB_CONNECTION === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  sequelizeOptions
);

User.initModel(sequelize);
Admin.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
Category.initModel(sequelize);

User.hasMany(Order);
Order.belongsTo(User);
Category.hasMany(Product, { foreignKey: "CategoryId", onDelete: "RESTRICT" });
Product.belongsTo(Category);

module.exports = {
  sequelize,
  User,
  Admin,
  Product,
  Order,
  Category,
};
