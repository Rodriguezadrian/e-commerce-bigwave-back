const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkRole = require("../mw/permissionRequired");

router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] })); //checkea el token
router.use(checkRole.admin); //checkea el rol de admin
router.get("/", adminController.index);
router.post("/", adminController.store);
router.get("/:id", adminController.show);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
