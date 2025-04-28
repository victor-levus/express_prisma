const express = require("express");
// const { authMiddleware } = require("../middleware/auth");
const {
	createMusicUrl,
	getAllMusicUrls,
	getMusicUrlById,
} = require("../controllers/musicController");

const router = express.Router();

// All can create sales
router.post(
	"/",
	// authMiddleware(["CASHIER", "SUPERVISOR", "MANAGER", "ADMIN"]),
	createMusicUrl
);

// Supervisors, Managers, and Admins can view sales
router.get(
	"/",
	// authMiddleware(["CASHIER", "SUPERVISOR", "MANAGER", "ADMIN"]),
	getAllMusicUrls
);
router.get(
	"/:id",
	// authMiddleware(["SUPERVISOR", "MANAGER", "ADMIN"]),
	getMusicUrlById
);

module.exports = router;
