import express from 'express';
import {
  CreateUser,
  DeleteUser,
  GetUser,
  GetUsers,
  loginUser,
  UpdateUser
} from '../controllers/UserController';

const UserRoutes = express.Router();

UserRoutes.get('/users', GetUsers);
UserRoutes.get('/users/:id', GetUser);
UserRoutes.post('/users', CreateUser);
UserRoutes.post('/login', loginUser);
UserRoutes.put('/users/:id', UpdateUser);
UserRoutes.delete('/users/:id', DeleteUser);

export default UserRoutes;