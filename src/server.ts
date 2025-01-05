import express, { Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
require('dotenv').config();

// import StudentInClassRoutes from '../routes/StudetnInClassRoutes';
import cors from 'cors';
import ArtistRoutes from '../routes/ArtistRoutes';
import UserRoutes from '../routes/UserRoutes';
import RatingRoutes from '../routes/RatingRoutes';
import LoginRoute from '../routes/LoginRoute';
import ArtistRatingsRoute from '../routes/ArtistRatingsRoute';
import RateRoute from '../routes/RateRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Artist API services...' });
});

app.use('/api',
  LoginRoute, 
  authenticateToken,
  ArtistRoutes,
  UserRoutes,
  RatingRoutes,
  ArtistRatingsRoute,
  RateRoute
);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    'server running on port 5000 : \nlocalhost: http://localhost:5000',
  );
});
