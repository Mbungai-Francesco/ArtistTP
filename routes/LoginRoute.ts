import express from 'express';
import { CreateUser, loginUser } from '../controllers/UserController';

const LoginRoute = express.Router();
const UserRoute = express.Router();

UserRoute.post('/users', CreateUser);

LoginRoute.post('/login', loginUser);

export {LoginRoute, UserRoute};