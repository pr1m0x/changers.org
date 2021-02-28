import { RequestHandler, Response, Request } from 'express';
import AppError from '../utils/customAppError';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// [ sendToken, sendToken, signup, login, checkIfLoggedIn ]

const createJWTToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const sendToken = (res: Response, id: string) => {
    // ▼ Create JWT Token //
    const token = createJWTToken(id);

    // ▼ Send JWT Token Cookie to client //
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
        // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    // ▼ Send success feedback back to axios //
    res.status(200).json({
        status: 'success',
        token,
    });
};

const signup: RequestHandler = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        // ▼ Check if User already exists //
        const userFound = await User.find({ username: username });
        const emailFound = await User.find({ email: email });

        // ▼ Stop and send Error back if User exists //
        if (userFound.length > 0) return next(new AppError(400, 'Benutzername wird bereits verwendet', 'username'));
        if (emailFound.length > 0) return next(new AppError(400, 'Email wird bereits verwendet', 'email'));

        const user = await User.create({ email, password, username });
        sendToken(res, user._id);
    } catch (err) {
        next(err);
    }
};

const login: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('password');
        // ▼ If no user found, send Error back
        if (!user) return next(new AppError(400, 'Email nicht gefunden', 'email'));

        // ▼ If User exists
        const { password } = req.body;

        // ▼ If PW is incorrect
        if (!(await bcrypt.compare(password, user.password)))
            return next(new AppError(400, 'Passwort nicht korrekt', 'password'));

        // ▼ If PW is correct - create JWT Token
        sendToken(res, user._id);
    } catch (err) {
        // next(err);
        // res.status(404, 'Email oder Passwort nicht korrekt', 'passwot');
    }
};

const signout: RequestHandler = (req, res, next) => {
    res.cookie('jwt', '');
    res.redirect('/');
};

const protect: RequestHandler = async (req, res, next) => {
    try {
        if (!req.cookies.jwt) next(new AppError(403, 'Sie sind nicht eingeloggt', '403'));
        // 2 Check if JWT token is correct
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        // if no send error page
        const user = await User.findById(decoded.id);
        // add user to req and show page
        req.user = user;
        next();
    } catch (err) {
        next(new AppError(403, 'Sie sind nicht eingeloggt', '403'));
    }
};

const isLoggedIn: RequestHandler = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            req.user = user;
            res.locals.isLoggedIn = true;
            res.locals.user = user;
            next();
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.cookie('jwt', '');
        res.redirect('/login');
    }
};

export default {
    signup,
    login,
    signout,
    protect,
    isLoggedIn,
};
