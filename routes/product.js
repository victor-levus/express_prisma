const express = require("express");
const multer = require("multer");
const path = require("path");
const { authMiddleware, verifyToken } = require("../middleware/auth");
const {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	getProductByBarcode,
	searchProductByBarcode,
	getPopularProducts,
} = require("../controllers/productController");

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
	},
});

const upload = multer({ storage });

// Manager/Admin can create products
router.post(
	"/",
	authMiddleware(["MANAGER", "ADMIN"]),
	upload.single("image"),
	createProduct
);
// Serve images statically
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// All users can view products
router.get("/", authMiddleware(["MANAGER", "ADMIN"]), getAllProducts);
router.get("/:id", authMiddleware(), getProductById);
router.get("/barcode/:barcode", authMiddleware(), getProductByBarcode);
router.get("/searchname/:barcode", authMiddleware(), searchProductByBarcode);
router.get(
	"/saleitems/popular",
	authMiddleware(),
	// verifyToken(),
	getPopularProducts
);

// Manager/Admin can update products
router.put(
	"/:id",
	authMiddleware(["MANAGER", "ADMIN"]),
	upload.single("image"),
	updateProduct
);

// Manager/Admin can delete products
router.delete("/:id", authMiddleware(["MANAGER", "ADMIN"]), deleteProduct);

module.exports = router;
