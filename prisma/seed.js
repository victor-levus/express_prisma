const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.hub.createMany({
		data: [
			{
				name: "Tech Hub A",
				description: "Description of Tech Hub A",
				latitude: 9.058184276375478,
				longitude: 7.468687192711118,
				region: "North Central",
			},

			{
				name: "Tech Hub B",
				description: "Description of Tech Hub B",
				latitude: 9.05695525132421,
				longitude: 7.46806492051228,
				region: "North Central",
			},
			{
				name: "Tech Hub C",
				description: "Description of Tech Hub C",
				latitude: 9.059858268764444,
				longitude: 7.473837101888878,
				region: "North Central",
			},
			{
				name: "Tech Hub D",
				description: "Description of Tech Hub D",
				latitude: 9.06157470071399,
				longitude: 7.47043602105672,
				region: "North Central",
			},
			{
				name: "Tech Hub E",
				description: "Description of Tech Hub E",
				latitude: 9.059582822862605,
				longitude: 7.4672280635760115,
				region: "North Central",
			},
		],
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
