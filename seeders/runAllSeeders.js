require("dotenv").config();

async function runAllSeeders() {
  await require("./categoriesSeeder.js")();
  await require("./productsSeeder.js")();
  await require("./usersSeeder.js")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
}

runAllSeeders();
