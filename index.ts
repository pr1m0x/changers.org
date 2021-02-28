declare global {
    namespace Express {
        interface Request {
            user?: any;
            file?: any;
        }
    }
}

require('dotenv/config');
import AppError from './src/utils/customAppError';

import express from 'express';
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configs
const logger = require('morgan');
const cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup static foler
app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Importing Router
const viewRoutes = require('./src/routes/viewRoutes');
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authController = require('./src/controllers/authController');

const errorHandler = require('./src/controllers/errorController');

// Routes
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
    .then((x: any) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err: Error) => {
        console.error('Error connecting to mongo: ', err);
    });

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

app.all('*', (req, res, next) => {
    next(new AppError(404, 'Diese Seite ist nicht vorhanden.', ''));
});

app.use('/', errorHandler.default.errorHandler);
