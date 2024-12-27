import express from 'express';
import {
  CreateArtist,
  DeleteArtist,
  GetArtist,
  GetArtists,
  UpdateArtist
} from '../controllers/ArtistController';

const ArtistRoutes = express.Router();

ArtistRoutes.get('/artists', GetArtists);
ArtistRoutes.get('/artists/:id', GetArtist);
ArtistRoutes.post('/artists', CreateArtist);
ArtistRoutes.put('/artists/:id', UpdateArtist);
ArtistRoutes.delete('/artists/:id', DeleteArtist);

export default ArtistRoutes;