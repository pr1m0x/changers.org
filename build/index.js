"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const customAppError_1 = __importDefault(require("./src/utils/customAppError"));
const express_1 = __importDefault(require("express"));
const path = require('path');
const app = express_1.default();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const cookieParser = require('cookie-parser');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const viewRoutes = require('./src/routes/viewRoutes');
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authController = require('./src/controllers/authController');
const errorHandler = require('./src/controllers/errorController');
app.use('/', authController.default.isLoggedIn);
app.use('/', viewRoutes);
app.use('/', authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/user', userRoutes);
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/ironhack-boiler-plate';
mongoose
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
    .catch((err) => {
    console.error('Error connecting to mongo: ', err);
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
app.all('*', (req, res, next) => {
    next(new customAppError_1.default(404, 'Diese Seite ist nicht vorhanden.', ''));
});
app.use('/', errorHandler.default.errorHandler);
//# sourceMappingURL=index.js.map