const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const checkRole = require("../middleWares/permissionRequired");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", categoryController.index);
router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] })); //checkea el token
router.post("/", checkRole.admin, categoryController.store);
router.get("/:slug", categoryController.show);
router.patch("/:id", checkRole.admin, categoryController.update);
router.delete("/:id", checkRole.admin, categoryController.destroy);

module.exports = router;
