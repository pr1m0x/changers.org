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
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a email address'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please enter a user name'],
    },
    city: String,
    country: {
        type: String,
        default: 'Deutschland',
    },
    avatar: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Please enter at least 8 characters'],
        select: false,
    },
    eventsCreated: {
        type: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }],
    },
    eventsReported: [{ type: mongoose.Schema.ObjectId, ref: 'Report' }],
    usersReported: [{ type: mongoose.Schema.ObjectId, ref: 'Report' }],
    reports: [{ type: mongoose.Schema.ObjectId, ref: 'Report' }],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        trim: true,
    },
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    instagram: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    homepage: {
        type: String,
        trim: true,
    },
    residence: {
        type: String,
        trim: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt.hash(this.password, 12);
        console.log(this.password);
        next();
    });
});
const User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map