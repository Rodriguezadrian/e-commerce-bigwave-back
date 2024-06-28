const { Product } = require("../models");
const productsData = require("./productsDb");

async function productsSeeder() {
  try {
    await Product.bulkCreate(productsData);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

module.exports = productsSeeder;
