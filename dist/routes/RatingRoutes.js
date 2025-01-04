"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RatingController_1 = require("../controllers/RatingController");
const RatingRoutes = express_1.default.Router();
RatingRoutes.get('/ratings', RatingController_1.GetRatings);
RatingRoutes.get('/ratings/:id', RatingController_1.GetRating);
RatingRoutes.get('/rate', RatingController_1.findRating);
RatingRoutes.get('/artist_ratings/:artistId', RatingController_1.artistRatings);
RatingRoutes.post('/ratings', RatingController_1.CreateRating);
RatingRoutes.put('/ratings/:id', RatingController_1.UpdateRating);
RatingRoutes.delete('/ratings/:id', RatingController_1.DeleteRating);
exports.default = RatingRoutes;
