const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const checkRole = require("../middleWares/permissionRequired");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", productController.index);
router.get("/random", productController.random);
router.get("/:slug", productController.show);
router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] })); //checkea el token
router.post("/", checkRole.admin, productController.store);
router.patch("/:id", checkRole.admin, productController.update);
router.delete("/:id", checkRole.admin, productController.destroy);

module.exports = router;
