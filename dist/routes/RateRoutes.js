"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RatingController_1 = require("../controllers/RatingController");
const RateRoute = express_1.default.Router();
RateRoute.get('/rate', RatingController_1.findRating);
exports.default = RateRoute;
