const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.index);
router.post("/", adminController.store);
router.get("/:id", adminController.show);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
