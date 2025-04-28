const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createSale = async (req, res) => {
	const { items, totalPrice, paymentType, comment, discount } = req.body;
	try {
		const sale = await prisma.sale.create({
			data: {
				userId: req.user.userId,
				totalPrice,
				items: {
					create: items.map((item) => ({
						productId: item.id,
						productName: item.name,
						quantity: item.qty,
						priceAtSale: item.price,
					})),
				},
				paymentType,
				comment,
				discount,
			},
			include: { items: true },
		});
		res.json(sale);
	} catch (error) {
		console.log(error);
	}
};

exports.getAllSales = async (req, res) => {
	const sales = await prisma.sale.findMany({
		include: { items: true, user: true },
	});
	res.json(sales);
};

exports.getAllSalesByUserId = async (req, res) => {
	const now = new Date();
	const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

	const { id } = req.params;

	const sales = await prisma.sale.findMany({
		where: {
			userId: id,
			createdAt: {
				gte: last24Hours, // Fetch only songs created in the last 24 hours
			},
		},
		orderBy: {
			createdAt: "desc", // Sort by latest first
		},
		include: { items: true, user: true },
	});
	res.json(sales);
};

exports.getSaleById = async (req, res) => {
	const { id } = req.params;
	const sale = await prisma.sale.findUnique({
		where: { id },
		include: { items: true },
	});
	if (!sale) return res.status(404).json({ message: "Sale not found" });
	res.json(sale);
};
