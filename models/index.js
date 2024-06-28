const { Sequelize } = require("sequelize");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Category = require("./Category");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);
User.initModel(sequelize);
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
  Product,
  Order,
  Category,
};
