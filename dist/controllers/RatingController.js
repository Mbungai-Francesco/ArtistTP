"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistRatings = exports.findRating = exports.DeleteRating = exports.UpdateRating = exports.GetRating = exports.GetRatings = exports.CreateRating = void 0;
const db_1 = require("../lib/db");
const CreateRating = async (req, res) => {
    try {
        const { rate, userId, artistId } = await req.body;
        if (!rate || !userId || !artistId) {
            return res.status(400).json({
                message: "rating, userId and artistId are required, please try again with these values added",
            });
        }
        // find rating in db
        const findrating = await db_1.db.rating.findUnique({
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
        const createRating = await db_1.db.rating.create({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.CreateRating = CreateRating;
const GetRatings = async (req, res) => {
    try {
        const ratings = await db_1.db.rating.findMany();
        if (!ratings || ratings.length === 0) {
            return res.status(404).json({ message: "No ratings found" });
        }
        return res.status(200).json({ message: "Ratings found", data: ratings });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.GetRatings = GetRatings;
const GetRating = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await db_1.db.rating.findUnique({
            where: {
                id: id,
            },
        });
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        return res.status(200).json({ message: "Rating found", data: rating });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.GetRating = GetRating;
const UpdateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rate } = await req.body;
        const updateRating = await db_1.db.rating.update({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.UpdateRating = UpdateRating;
const DeleteRating = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRating = await db_1.db.rating.delete({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.DeleteRating = DeleteRating;
const findRating = async (req, res) => {
    try {
        const { userId, artistId } = await req.body;
        if (!userId || !artistId) {
            return res.status(400).json({
                message: "userId and artistId are required, please try again with these values added",
            });
        }
        // find rating in db
        const findrating = await db_1.db.rating.findUnique({
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
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.findRating = findRating;
const artistRatings = async (req, res) => {
    try {
        const { artistId } = req.params;
        if (!artistId) {
            return res.status(400).json({
                message: "artistId is required, please try again with this value added",
            });
        }
        // find rating in db
        const findrating = await db_1.db.rating.findMany({
            where: {
                artistId: artistId,
            },
        });
        if (!findrating) {
            return res.status(404).json({ message: "no ratings found" });
        }
        return res.status(200).json({ message: "Ratings found", data: findrating });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.artistRatings = artistRatings;
