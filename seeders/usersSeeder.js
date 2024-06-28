const { User } = require("../models");
const usersData = require("../data/usersData");

async function usersSeeder() {
  try {
    await User.bulkCreate(usersData);
    console.log("users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

module.exports = usersSeeder;
