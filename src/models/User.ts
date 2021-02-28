import { model, Schema, Model, Document, ObjectId, SchemaDefinition } from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

interface User extends Document {
    email: string;
    username: string;
    avatar: string;
    role: string;
    city: string;
    country: string;
    password: string;
    eventsCreated: [ObjectId];
    eventsReported: [ObjectId];
    usersReported: [ObjectId];
    passwordChangedAt: Date;
    passwordResetToken: String;
    passwordResetExpires: Date;
    active: boolean;
    verified: boolean;
    bio: string;
    firstname: string;
    lastname: string;
    facebook: string;
    instagram: string;
    twitter: string;
    homepage: string;
    timestamps: {
        createdAt: 'created_at';
        updatedAt: 'updated_at';
    };
}

const userSchema: Schema = new Schema(
    {
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
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

userSchema.pre<User>('save', async function (next: any) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password);
    // Delete passwordConfirm field
    // this.passwordConfirm = undefined;
    next();
});

const User: Model<User> = mongoose.model('User', userSchema);

export = User;
