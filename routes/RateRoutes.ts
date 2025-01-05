import express from 'express';
import {
  findRating,
} from '../controllers/RatingController';

const RateRoute = express.Router();

RateRoute.get('/rate', findRating);

export default RateRoute;