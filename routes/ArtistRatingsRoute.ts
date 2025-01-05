import express from 'express';
import {
  artistRatings,
} from '../controllers/RatingController';

const ArtistRatingsRoute = express.Router();

ArtistRatingsRoute.get('/artist_ratings/:artistId', artistRatings);

export default ArtistRatingsRoute;