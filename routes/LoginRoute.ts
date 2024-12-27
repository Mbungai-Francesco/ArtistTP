import express from 'express';
import { loginUser } from '../controllers/UserController';

const LoginRoute = express.Router();

LoginRoute.post('/login', loginUser);

export default LoginRoute;