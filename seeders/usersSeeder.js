const { User } = require("../models");
const usersData = require("../data/usersData");
const bcrypt = require("bcryptjs");

async function usersSeeder() {
  try {
    const users = [];
    for (const user of usersData) {
      const hashedPassword = await bcrypt.hash("1234", 10);
      users.push({ ...user, password: hashedPassword });
    }
    await User.bulkCreate(users);
    console.log("users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}
module.exports = usersSeeder;
