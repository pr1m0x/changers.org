import { model, Schema, Model, Document, ObjectId, SchemaDefinition } from 'mongoose';
import { convertDelta } from '../utils/convertDelta';
const User = require('../models/User');

const mongoose = require('mongoose');
const slugify = require('slugify');

interface Event extends Document {
    identifier: string;
    title: {
        type: string;
        trim: true;
    };
    topic: string;
    slug: string;
    creator: ObjectId;
    participants: [ObjectId];
    likes: number;
    description: string;
    previewText: string;
    banner: string;
    publicId: string;
    timestamps: {
        createdAt: 'created_at';
        updatedAt: 'updated_at';
    };
}

const eventSchema: Schema = new Schema(
    {
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
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

// • GENERATE UNIQUE IDENTIFIER • / /
eventSchema.pre<Event>('save', function (next) {
    if (this.isNew) this.identifier = Date.now() + Math.ceil(Math.random() * 100).toString();
    next();
});

// • CREATED previewText • / /
eventSchema.pre<Event>('save', function (next) {
    const html = convertDelta(this.description);
    this.previewText = html
        .replace(/( |<([^>]+)>)/gi, ' ')
        .replace(/\s{2,}/g, ' ')
        .slice(0, 275)
        .trim();
    next();
});

// • SAVING DEMO TO USER • //
eventSchema.pre<Event>('save', async function () {
    if (!this.isNew) return;

    const documentId = this._id;
    await User.findByIdAndUpdate(this.creator, {
        $addToSet: { eventsCreated: documentId },
    });
});

eventSchema.pre<Event>('save', function (next) {
    if (this.isNew) this.slug = slugify(this.title, { lower: true });
    next();
});

const Event = mongoose.model('Event', eventSchema);

export = Event;
