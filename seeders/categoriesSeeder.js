const { Category } = require("../models");
const categoriesData = require("../data/categoriesData.js");

async function categoriesSeeder() {
  try {
    await Category.bulkCreate(categoriesData);
    console.log("categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
}

module.exports = categoriesSeeder;
