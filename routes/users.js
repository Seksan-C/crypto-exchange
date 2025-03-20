const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/register", UserController.registerUser); // ✅ เส้นทางสำหรับสมัครสมาชิก

module.exports = router;
