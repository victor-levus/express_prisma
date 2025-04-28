const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Admin can view all users
router.get("/", authMiddleware(["ADMIN"]), getAllUsers);

// Admin can view a specific user
router.get("/:id", authMiddleware(["ADMIN"]), getUserById);

// Admin can update a user
router.put("/:id", authMiddleware(["ADMIN"]), updateUser);

// Admin can delete a user
router.delete("/:id", authMiddleware(["ADMIN"]), deleteUser);

module.exports = router;
