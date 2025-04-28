const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createMusicUrl = async (req, res) => {
	const { artist, audioUrl, id: urlId, thumbnails, title, url } = req.body;

	// console.log(req.body);
	try {
		// if (urlId) {
		// 	const musicStream = await prisma.musicStream.findUnique({
		// 		where: { urlId: urlId },
		// 	});

		// 	if (musicStream)
		// 		return res.status(400).json({ message: "Music Stream already exists" });
		// }

		const musicStream = await prisma.musicStream.create({
			data: {
				artist,
				audioUrl,
				urlId,
				thumbnails: {
					create: [
						{
							url: thumbnails[0].url,
							width: thumbnails[0].width,
							height: thumbnails[0].height,
						},
						{
							url: thumbnails[1].url,
							width: thumbnails[1].width,
							height: thumbnails[1].height,
						},
						{
							url: thumbnails[2].url,
							width: thumbnails[2].width,
							height: thumbnails[2].height,
						},
					],
				},
				title,
				url,
			},
			include: { thumbnails: true },
		});
		res.json(musicStream);
	} catch (error) {
		console.log(error);
	}
};

exports.getAllMusicUrls = async (req, res) => {
	const musicSctream = await prisma.musicStream.findMany({
		include: { thumbnails: true },
	});
	res.json(musicSctream);
};

exports.getMusicUrlById = async (req, res) => {
	// console.log("getMusicUrlById...");

	try {
		const { id } = req.params;

		console.log(id);

		const musicStream = await prisma.musicStream.findFirst({
			where: { urlId: id },
			include: { thumbnails: true },
		});

		if (!musicStream)
			return res.status(808).json({ message: "Music Stream not found" });

		res.status(200).json(musicStream);
	} catch (error) {
		console.log(error);
	}
};
