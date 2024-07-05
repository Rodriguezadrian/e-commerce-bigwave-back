require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.get("/", (req, res) => res.json({ msg: "Welcome to BigWave!" }));

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on port 3000");
});
