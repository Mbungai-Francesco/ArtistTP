"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteArtist = exports.UpdateArtist = exports.GetArtist = exports.GetArtists = exports.CreateArtist = void 0;
const db_1 = require("../lib/db");
const CreateArtist = async (req, res) => {
    try {
        const { stageName } = await req.body;
        if (!stageName) {
            return res.status(400).json({
                message: 'stageName is required. please try again with these value added',
            });
        }
        // find artist in db
        const findartist = await db_1.db.artist.findUnique({
            where: {
                stageName,
            },
        });
        if (findartist) {
            return res
                .status(400)
                .json({ message: 'artist already exists', data: findartist });
        }
        const createArtist = await db_1.db.artist.create({
            data: {
                ...req.body
            }
        });
        if (!createArtist) {
            return res.status(400).json({ message: 'artist not created' });
        }
        return res
            .status(201)
            .json({ message: 'Artist created successfully', data: createArtist });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.CreateArtist = CreateArtist;
const GetArtists = async (req, res) => {
    try {
        const artists = await db_1.db.artist.findMany({
            include: {
                followers: true
            }
        });
        if (!artists || artists.length === 0) {
            return res.status(404).json({ message: 'No artist found' });
        }
        return res.status(200).json({ message: 'Artists found', data: artists });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.GetArtists = GetArtists;
const GetArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await db_1.db.artist.findUnique({
            where: {
                id: id,
            },
            include: {
                followers: true
            }
        });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        return res.status(200).json({ message: 'Artist found', data: artist });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.GetArtist = GetArtist;
const UpdateArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await db_1.db.artist.findUnique({
            where: {
                id: id,
            },
        });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const updatedArtist = await db_1.db.artist.update({
            where: {
                id: id,
            },
            data: {
                ...req.body,
            },
        });
        if (!updatedArtist) {
            return res.status(400).json({ message: 'Artist not updated' });
        }
        return res
            .status(200)
            .json({ message: 'Artist updated', data: updatedArtist });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.UpdateArtist = UpdateArtist;
const DeleteArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await db_1.db.artist.findUnique({
            where: {
                id: id,
            },
        });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const deletedArtist = await db_1.db.artist.delete({
            where: {
                id: id,
            },
        });
        if (!deletedArtist) {
            return res.status(400).json({ message: 'Artist not deleted' });
        }
        return res
            .status(200)
            .json({ message: 'Artist deleted', data: deletedArtist });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.DeleteArtist = DeleteArtist;
