const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
	createSale,
	getAllSales,
	getSaleById,
	getAllSalesByUserId,
} = require("../controllers/saleController");

const router = express.Router();

// All can create sales
router.post(
	"/",
	authMiddleware(["CASHIER", "SUPERVISOR", "MANAGER", "ADMIN"]),
	createSale
);

// Supervisors, Managers, and Admins can view sales
router.get(
	"/",
	authMiddleware(["CASHIER", "SUPERVISOR", "MANAGER", "ADMIN"]),
	getAllSales
);

router.get(
	"/user/:id",
	authMiddleware(["CASHIER", "SUPERVISOR", "MANAGER", "ADMIN"]),
	getAllSalesByUserId
);

router.get(
	"/:id",
	authMiddleware(["SUPERVISOR", "MANAGER", "ADMIN"]),
	getSaleById
);

module.exports = router;
