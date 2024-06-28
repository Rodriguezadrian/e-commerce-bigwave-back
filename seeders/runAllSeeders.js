require("dotenv").config();

async function runAllSeeders() {
  await require("./categoriesSeeder.js")();
  await require("./productsSeeder.js")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
}

runAllSeeders();
