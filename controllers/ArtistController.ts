import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateArtist = async (req: Request, res: Response) => {
  try{
    const { stageName } = await req.body;

    if (!stageName) {
      return res.status(400).json({
        message:
          'stageName is required. please try again with these value added',
      });
    }

    // find artist in db
    const findartist = await db.artist.findUnique({
      where: {
        stageName,
      },
    })

    if (findartist) {
      return res
        .status(400)
        .json({ message: 'artist already exists', data: findartist });
    }

    const createArtist = await db.artist.create({
      data:{
        ...req.body
      }
    })

    if (!createArtist) {
      return res.status(400).json({ message: 'artist not created' });
    }
    return res
      .status(201)
      .json({ message: 'Artist created successfully', data: createArtist });
  }
  catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetArtists = async (req: Request, res: Response) => {
  try {
    const artists = await db.artist.findMany({
      include :{
        followers: true
      }
    });
    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: 'No artist found' });
    }
    return res.status(200).json({ message: 'Artists found', data: artists });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = await db.artist.findUnique({
      where: {
        id: id,
      },
      include :{
        followers: true
      }
    });

    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    return res.status(200).json({ message: 'Artist found', data: artist });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const UpdateArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = await db.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    const updatedArtist = await db.artist.update({
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
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const DeleteArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = await db.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    const deletedArtist = await db.artist.delete({
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
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}