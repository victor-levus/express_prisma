const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
};

exports.getUserById = async (req, res) => {
	const { id } = req.params;
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) return res.status(404).json({ message: "User not found" });
	res.json(user);
};

exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, role } = req.body;
	const updatedUser = await prisma.user.update({
		where: { id },
		data: { name, role },
	});
	res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	await prisma.user.delete({ where: { id } });
	res.json({ message: "User deleted successfully" });
};
