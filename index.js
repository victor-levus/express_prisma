const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const saleRoutes = require("./routes/sale");
const musicRoutes = require("./routes/musicRoutes");

const app = express();
const port = process.env.PORT || 5300;

// CONFIGURATION
app.use(cors());
app.use(express.json());

// ✅ Serve image files
app.use("/uploads", express.static("uploads"));

// ROUTES
app.get("/", (req, res) => {
	res.send("Supermarket POS API Running...");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/sales", saleRoutes);

app.use("/api/musicstream", musicRoutes);

// SERVER
app.listen(port, "0.0.0.0", () => {
	console.log(`Server running at http://0.0.0.0:${port}`);
});
