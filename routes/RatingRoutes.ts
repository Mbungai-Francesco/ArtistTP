import express from 'express';
import {
  artistRatings,
  CreateRating,
  DeleteRating,
  findRating,
  GetRating,
  GetRatings,
  UpdateRating
} from '../controllers/RatingController';

const RatingRoutes = express.Router();

RatingRoutes.get('/ratings', GetRatings);
RatingRoutes.get('/ratings/:id', GetRating);
RatingRoutes.get('/rate', findRating);
RatingRoutes.get('/artist_ratings', artistRatings);
RatingRoutes.post('/ratings', CreateRating);
RatingRoutes.put('/ratings/:id', UpdateRating);
RatingRoutes.delete('/ratings/:id', DeleteRating);

export default RatingRoutes;