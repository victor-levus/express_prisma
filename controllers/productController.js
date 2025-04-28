const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const router = express.Router();

exports.createProduct = async (req, res) => {
	const {
		name,
		barcode,
		description,
		price,
		stockQuantity,
		category,
		supplier,
		expiryDate,
		image,
	} = req.body;
	const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

	try {
		const product = await prisma.product.create({
			data: {
				name,
				barcode,
				description,
				price: parseFloat(price),
				stockQuantity: parseInt(stockQuantity),
				category,
				supplier,
				expiryDate: moment(expiryDate).toISOString(),
				image: imageUrl,
			},
		});
		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error });
	}
};

// ✅ Serve Uploaded Images
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

exports.getAllProducts = async (req, res) => {
	const products = await prisma.product.findMany();
	res.json(products);
};

exports.getPopularProducts = async (req, res) => {
	try {
		const popularProducts = await prisma.product.findMany({
			include: {
				_count: {
					select: { SaleItem: true }, // ✅ Count the number of salesItem
				},
			},
			orderBy: {
				SaleItem: {
					_count: "desc", // ✅ Order by number of salesItem in descending order
				},
			},
			take: 15,
		});
		res.json(popularProducts);
	} catch (error) {
		console.log(error);
	}
};

exports.getProductById = async (req, res) => {
	const { id } = req.params;
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) return res.status(404).json({ message: "Product not found" });
	res.json(product);
};

exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	const {
		name,
		description,
		price,
		stockQuantity,
		category,
		supplier,
		expiryDate,
	} = req.body;
	const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

	const updatedProductData = imageUrl
		? {
				name,
				description,
				price: parseFloat(price),
				stockQuantity: parseInt(stockQuantity),
				category,
				supplier,
				expiryDate: moment(expiryDate).toISOString(),
				image: imageUrl,
		  }
		: {
				name,
				description,
				price: parseFloat(price),
				stockQuantity: parseInt(stockQuantity),
				category,
				supplier,
				expiryDate: moment(expiryDate).toISOString(),
		  };

	try {
		const findProduct = await prisma.product.findUnique({ where: { id } });
		if (!findProduct)
			return res.status(404).json({ message: "Product not found" });

		const updatedProduct = await prisma.product.update({
			where: { id },
			data: updatedProductData,
		});
		res.json(updatedProduct);

		// console.log(updatedProduct);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error });
	}
};

exports.deleteProduct = async (req, res) => {
	const { id } = req.params;
	await prisma.product.delete({ where: { id } });
	res.json({ message: "Product deleted successfully" });
};

exports.getProductByBarcode = async (req, res) => {
	const { barcode } = req.params;
	try {
		const product = await prisma.product.findUnique({
			where: { barcode },
		});

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: "Error fetching product" });
	}
};

exports.searchProductByBarcode = async (req, res) => {
	const { barcode: searchText } = req.params;

	try {
		const product = await prisma.product.findMany({
			where: {
				barcode: {
					contains: searchText,
					// mode: "insensitive", // Case-insensitive search
				},
			},
		});

		if (!product) {
			return res.json([]);
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: "Error fetching product" });
	}
};
