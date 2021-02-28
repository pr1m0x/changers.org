"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customAppError_1 = __importDefault(require("../utils/customAppError"));
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createJWTToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const sendToken = (res, id) => {
    const token = createJWTToken(id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({
        status: 'success',
        token,
    });
};
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const userFound = yield User.find({ username: username });
        const emailFound = yield User.find({ email: email });
        if (userFound.length > 0)
            return next(new customAppError_1.default(400, 'Benutzername wird bereits verwendet', 'username'));
        if (emailFound.length > 0)
            return next(new customAppError_1.default(400, 'Email wird bereits verwendet', 'email'));
        const user = yield User.create({ email, password, username });
        sendToken(res, user._id);
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email }).select('password');
        if (!user)
            return next(new customAppError_1.default(400, 'Email nicht gefunden', 'email'));
        const { password } = req.body;
        if (!(yield bcrypt.compare(password, user.password)))
            return next(new customAppError_1.default(400, 'Passwort nicht korrekt', 'password'));
        sendToken(res, user._id);
    }
    catch (err) {
    }
});
const signout = (req, res, next) => {
    res.cookie('jwt', '');
    res.redirect('/');
};
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.cookies.jwt)
            next(new customAppError_1.default(403, 'Sie sind nicht eingeloggt', '403'));
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const user = yield User.findById(decoded.id);
        req.user = user;
        next();
    }
    catch (err) {
        next(new customAppError_1.default(403, 'Sie sind nicht eingeloggt', '403'));
    }
});
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.cookies.jwt) {
            const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
            const user = yield User.findById(decoded.id);
            req.user = user;
            res.locals.isLoggedIn = true;
            res.locals.user = user;
            next();
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.cookie('jwt', '');
        res.redirect('/login');
    }
});
exports.default = {
    signup,
    login,
    signout,
    protect,
    isLoggedIn,
};
//# sourceMappingURL=authController.js.map