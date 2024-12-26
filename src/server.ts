import express, { Request, Response } from 'express';
require('dotenv').config();

// import StudentInClassRoutes from '../routes/StudetnInClassRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to ATLAS API services...' });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});

app.listen(5000, () => {
  console.log(
    'server running on port 5000 : \nlocalhost: http://localhost:5000',
  );
});
