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
const mongoose_1 = require("mongoose");
const convertDelta_1 = require("../utils/convertDelta");
const User = require('../models/User');
const mongoose = require('mongoose');
const slugify = require('slugify');
const eventSchema = new mongoose_1.Schema({
    identifier: String,
    title: {
        type: String,
        trim: true,
    },
    topic: String,
    slug: String,
    creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    likes: Number,
    banner: String,
    publicId: String,
    description: String,
    previewText: String,
    tags: {
        type: [String],
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
eventSchema.pre('save', function (next) {
    if (this.isNew)
        this.identifier = Date.now() + Math.ceil(Math.random() * 100).toString();
    next();
});
eventSchema.pre('save', function (next) {
    const html = convertDelta_1.convertDelta(this.description);
    this.previewText = html
        .replace(/( |<([^>]+)>)/gi, ' ')
        .replace(/\s{2,}/g, ' ')
        .slice(0, 275)
        .trim();
    next();
});
eventSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew)
            return;
        const documentId = this._id;
        yield User.findByIdAndUpdate(this.creator, {
            $addToSet: { eventsCreated: documentId },
        });
    });
});
eventSchema.pre('save', function (next) {
    if (this.isNew)
        this.slug = slugify(this.title, { lower: true });
    next();
});
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
//# sourceMappingURL=Event.js.map