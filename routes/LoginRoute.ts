import express from 'express';
import { CreateUser, loginUser } from '../controllers/UserController';

const LoginRoute = express.Router();
const UserRoutes = express.Router();

UserRoutes.post('/users', CreateUser);

LoginRoute.post('/login', loginUser);

export default LoginRoute;