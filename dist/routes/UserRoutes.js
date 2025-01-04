"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const UserRoutes = express_1.default.Router();
UserRoutes.get('/users', UserController_1.GetUsers);
UserRoutes.get('/users/:id', UserController_1.GetUser);
UserRoutes.post('/users', UserController_1.CreateUser);
UserRoutes.post('/login', UserController_1.loginUser);
UserRoutes.put('/users/:id', UserController_1.UpdateUser);
UserRoutes.delete('/users/:id', UserController_1.DeleteUser);
exports.default = UserRoutes;
