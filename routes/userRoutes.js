const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkRole = require("../middlewares/permissionRequired");

router.post("/", userController.store); //guardar un nuevo usuario (admin o cliente)
router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] })); //checkea el token
router.get("/my-profile", userController.showMyProfile); // mostrar mi perfil (cliente)
router.patch("/my-profile", userController.updateMyProfile); // actualizar mi perfil (cliente)
router.delete("/my-profile", userController.destroyMyProfile); // eliminar mi perfil (cliente)

router.get("/", checkRole.admin, userController.index); // mostrar todos los usuarios (admin)
router.get("/client-profile/:id", checkRole.admin, userController.showClient); // mostrar perfil de un cliente (admin)
router.delete( "/client-profile/:id",checkRole.admin,userController.destroyClient); // eliminar perfil de un cliente (admin)

module.exports = router;
