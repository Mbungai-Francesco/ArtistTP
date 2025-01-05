"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RatingController_1 = require("../controllers/RatingController");
const ArtistRatingsRoute = express_1.default.Router();
ArtistRatingsRoute.get('/artist_ratings/:artistId', RatingController_1.artistRatings);
exports.default = ArtistRatingsRoute;
