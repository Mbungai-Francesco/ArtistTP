"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArtistController_1 = require("../controllers/ArtistController");
const ArtistRoutes = express_1.default.Router();
ArtistRoutes.get('/artists', ArtistController_1.GetArtists);
ArtistRoutes.get('/artists/:id', ArtistController_1.GetArtist);
ArtistRoutes.post('/artists', ArtistController_1.CreateArtist);
ArtistRoutes.put('/artists/:id', ArtistController_1.UpdateArtist);
ArtistRoutes.delete('/artists/:id', ArtistController_1.DeleteArtist);
exports.default = ArtistRoutes;
