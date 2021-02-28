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
Object.defineProperty(exports, "__esModule", { value: true });
const Event = require('../models/Event');
const User = require('../models/User');
const convertDelta_1 = require("../utils/convertDelta");
const home = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event.find().populate('creator');
    res.render('./pages/home', { events });
});
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(req.user._id).populate('eventsCreated');
    res.render('./pages/me', { user });
});
const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(req.user._id);
    res.render('./pages/userEdit', { user });
});
const userEdit = (req, res, next) => {
    res.render('./pages/userEdit', { user: req.user });
};
const eventDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event.findById(req.params.id).populate('creator');
    event.description = convertDelta_1.convertDelta(event.description);
    res.render('./pages/eventDetail', { event });
});
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    let searchResult;
    if (query) {
        const regExp = new RegExp(new RegExp(query.toString(), 'i'));
        const results = yield Event.find({ title: regExp });
        if (results.length > 0)
            searchResult = results;
    }
    const events = yield Event.find();
    res.render('./pages/search', { events, searchResult });
});
const searchResult = (req, res, next) => {
    res.render('./pages/searchResult');
};
const start = (req, res, next) => {
    res.render('./pages/eventCreate');
};
const eventPreview = (req, res, next) => {
    res.render('./pages/eventPreview');
};
const eventEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event.findById(req.params.id).populate('creator');
    event.tags = JSON.stringify(event.tags);
    res.render('./pages/eventEdit', { event });
});
const signup = (req, res, next) => {
    res.render('./pages/signup');
};
const login = (req, res, next) => {
    res.render('./pages/login');
};
exports.default = {
    home,
    me,
    profile,
    userEdit,
    eventDetail,
    search,
    searchResult,
    start,
    eventPreview,
    eventEdit,
    signup,
    login,
};
//# sourceMappingURL=viewController.js.map