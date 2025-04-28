const jwt = require("jsonwebtoken");

exports.authMiddleware = (roles = []) => {
	return (req, res, next) => {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) return res.status(401).json({ message: "Access denied" });

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;

			if (roles.length && !roles.includes(req.user.role)) {
				return res.status(403).json({ message: "Forbidden" });
			}

			next();
		} catch {
			res.status(401).json({ message: "Invalid or expired token!" });
		}
	};
};

exports.verifyToken = () => {
	return (req, res, next) => {
		const token2 = req.headers.authorization?.split(" ")[1];
		const token = req.header("Authorization")?.split(" ")[1]; // Get token from header

		console.log(token);
		console.log(token2);

		if (!token) {
			return res
				.status(401)
				.json({ message: "Access Denied! No token provided." });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token
			req.user = decoded; // Attach user info to request
			next(); // Continue to the next middleware
		} catch (error) {
			return res.status(403).json({ message: "Invalid or expired token!" });
		}
	};
};
