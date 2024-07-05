const { Admin } = require("../models");
const adminData = require("../data/adminData");
const bcrypt = require("bcryptjs");

async function adminsSeeder() {
  try {
    const admins = [];
    for (const admin of adminData) {
      const hashedPassword = await bcrypt.hash("1234", 10);
      admins.push({ ...admin, password: hashedPassword });
    }
    await Admin.bulkCreate(admins);
    console.log("admins seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

module.exports = adminsSeeder;
