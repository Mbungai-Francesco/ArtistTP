import { db } from "../lib/db";
import { Request, Response } from "express";

export const CreateRating = async (req: Request, res: Response) => {
	try {
		const { rate, userId, artistId } = await req.body;

		if (!rate || !userId || !artistId) {
			return res.status(400).json({
				message:
					"rating, userId and artistId are required, please try again with these values added",
			});
		}

		// find rating in db
		const findrating = await db.rating.findUnique({
			where: {
				artistId_userId: {
					artistId,
					userId,
				},
			},
		});

		if (findrating) {
			return res
				.status(400)
				.json({ message: "rating already exists", data: findrating });
		}

		const createRating = await db.rating.create({
			data: {
				...req.body,
			},
		});

		if (!createRating) {
			return res.status(400).json({ message: "rating not created" });
		}
		return res
			.status(201)
			.json({ message: "Rating created", data: createRating });
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const GetRatings = async (req: Request, res: Response) => {
	try {
		const ratings = await db.rating.findMany();
		if (!ratings || ratings.length === 0) {
			return res.status(404).json({ message: "No ratings found" });
		}
		return res.status(200).json({ message: "Ratings found", data: ratings });
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const GetRating = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const rating = await db.rating.findUnique({
			where: {
				id: id,
			},
		});

		if (!rating) {
			return res.status(404).json({ message: "Rating not found" });
		}
		return res.status(200).json({ message: "Rating found", data: rating });
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const UpdateRating = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { rate } = await req.body;

		const updateRating = await db.rating.update({
			where: {
				id: id,
			},
			data: {
				rate: rate,
			},
		});

		if (!updateRating) {
			return res.status(400).json({ message: "Rating not updated" });
		}
		return res
			.status(200)
			.json({ message: "Rating updated", data: updateRating });
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const DeleteRating = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deleteRating = await db.rating.delete({
			where: {
				id: id,
			},
		});

		if (!deleteRating) {
			return res.status(400).json({ message: "Rating not deleted" });
		}
		return res
			.status(200)
			.json({ message: "Rating deleted", data: deleteRating });
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const findRating = async (req: Request, res: Response) => {
	try {
		const { userId, artistId } = await req.body;

		if (!userId || !artistId) {
			return res.status(400).json({
				message:
					"userId and artistId are required, please try again with these values added",
			});
		}

		// find rating in db
		const findrating = await db.rating.findUnique({
			where: {
				artistId_userId: {
					artistId,
					userId,
				},
			},
		});

		if (!findrating) {
			return res.status(404).json({ message: "not rated" });
		}
		return res.status(200).json({ message: "Rating found", data: findrating });
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const artistRatings = async (req: Request, res: Response) =>{
  try {
    const { artistId } = await req.body;

    if (!artistId) {
      return res.status(400).json({
        message:
          "artistId is required, please try again with this value added",
      });
    }

    // find rating in db
    const findrating = await db.rating.findMany({
      where: {
        artistId: artistId,
      },
    });

    if (!findrating) {
      return res.status(404).json({ message: "no ratings found" });
    }
    return res.status(200).json({ message: "Ratings found", data: findrating });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}