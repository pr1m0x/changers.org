import { RequestHandler } from 'express';
const Event = require('../models/Event');
const User = require('../models/User');
import { convertDelta } from '../utils/convertDelta';

const home: RequestHandler = async (req, res, next) => {
    const events = await Event.find().populate('creator');
    res.render('./pages/home', { events });
};

const me: RequestHandler = async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('eventsCreated');
    res.render('./pages/me', { user });
};

const profile: RequestHandler = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.render('./pages/userEdit', { user });
};

const userEdit: RequestHandler = (req, res, next) => {
    res.render('./pages/userEdit', { user: req.user });
};

const eventDetail: RequestHandler = async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate('creator');

    event.description = convertDelta(event.description);

    res.render('./pages/eventDetail', { event });
};

const search: RequestHandler = async (req, res, next) => {
    const query = req.query.q;
    let searchResult;
    if (query) {
        const regExp = new RegExp(new RegExp(query.toString(), 'i'));
        const results = await Event.find({ title: regExp });
        if (results.length > 0) searchResult = results;
    }

    const events = await Event.find();
    res.render('./pages/search', { events, searchResult });
};

const searchResult: RequestHandler = (req, res, next) => {
    res.render('./pages/searchResult');
};

const start: RequestHandler = (req, res, next) => {
    res.render('./pages/eventCreate');
};

const eventPreview: RequestHandler = (req, res, next) => {
    res.render('./pages/eventPreview');
};

const eventEdit: RequestHandler = async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate('creator');
    event.tags = JSON.stringify(event.tags);
    res.render('./pages/eventEdit', { event });
};

const signup: RequestHandler = (req, res, next) => {
    res.render('./pages/signup');
};

const login: RequestHandler = (req, res, next) => {
    res.render('./pages/login');
};

export default {
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
