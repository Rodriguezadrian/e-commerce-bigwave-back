const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkRole = require("../middlewares/permissionRequired");

router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] }));
router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", checkRole.admin, orderController.update);
router.delete("/:id", checkRole.admin, orderController.destroy);

module.exports = router;
