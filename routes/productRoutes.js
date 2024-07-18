const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/permissionRequired");
const { expressjwt: checkJwt } = require("express-jwt");
const uploadFile = require("../utils/fileUploader");

router.get("/", productController.index);
router.get("/:slug", productController.show);
router.use(checkJwt({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] })); // check JWT token
router.put("/:id/update-stock", productController.updateStock);
router.post("/", checkRole.admin, uploadFile, productController.store);
// router.post(
//   "/upload/:id",
//   checkRole.admin,
//   uploadFile,
//   productController.uploadImage
// );
router.patch("/:id", checkRole.admin, productController.update);
router.delete("/:id", checkRole.admin, productController.destroy);

module.exports = router;
