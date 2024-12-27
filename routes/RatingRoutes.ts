import express from 'express';
import {
  CreateRating,
  DeleteRating,
  GetRating,
  GetRatings,
  UpdateRating
} from '../controllers/RatingController';

const RatingRoutes = express.Router();

RatingRoutes.get('/ratings', GetRatings);
RatingRoutes.get('/ratings/:id', GetRating);
RatingRoutes.post('/ratings', CreateRating);
RatingRoutes.put('/ratings/:id', UpdateRating);
RatingRoutes.delete('/ratings/:id', DeleteRating);

export default RatingRoutes;