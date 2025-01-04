"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
require('dotenv').config();
// import StudentInClassRoutes from '../routes/StudetnInClassRoutes';
const cors_1 = __importDefault(require("cors"));
const ArtistRoutes_1 = __importDefault(require("../routes/ArtistRoutes"));
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const RatingRoutes_1 = __importDefault(require("../routes/RatingRoutes"));
const LoginRoute_1 = __importDefault(require("../routes/LoginRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Artist API services...' });
});
app.use('/api', LoginRoute_1.default, auth_1.authenticateToken, ArtistRoutes_1.default, UserRoutes_1.default, RatingRoutes_1.default);
app.get('*', (req, res) => {
    res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});
app.listen(5000, () => {
    console.log('server running on port 5000 : \nlocalhost: http://localhost:5000');
});
