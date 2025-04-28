const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// console.log(process.env.JWT_SECRET);

// Register user
router.post("/register", async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		if (!name || !email || !password || !role) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword, role },
		});

		res.json({ message: "User registered", user });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error });
	}
});

// Login user
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ userId: user.id, name: user.name, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);
		res.json({ token });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal Server Error", error: error });
	}
});

module.exports = router;
