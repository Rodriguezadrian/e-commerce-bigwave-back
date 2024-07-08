const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkRole = require("../middleWares/permissionRequired");

router.post("/", userController.store); //guardar un nuevo usuario (admin o cliente)
router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] })); //checkea el token
router.get("/", checkRole.admin, userController.index); // mostrar todos los usuarios (admin)
router.get("/my-profile", userController.showMyProfile); // mostrar mi perfil (cliente)
router.get("/client-profile", checkRole.admin, userController.showClient); // mostrar perfil de un cliente (admin)
router.patch("/my-profile", userController.updateMyProfile); // actualizar mi perfil (cliente)
router.delete("/my-profile", userController.destroyMyProfile); // eliminar mi perfil (cliente)
router.delete("/client-profile", checkRole.admin, userController.destroyClient); // eliminar perfil de un cliente (admin)

module.exports = router;
