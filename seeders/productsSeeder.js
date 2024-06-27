const { Product } = require("../models");
const productsData = require("./productsDb.json");

async function productsSeeder() {
  try {
    const products = [];
    for (let i = 0; i < 36; i++) {
      products.push({
        name: productsData[i].name,
        description: productsData[i].description,
        price: productsData[i].unit_price,
        image: productsData[i].image,
      });
    }

    await Product.bulkCreate(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

module.exports = productsSeeder;
