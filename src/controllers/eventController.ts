import { RequestHandler } from 'express';
import Event from '../models/Event';

interface IEvent {
    title: string;
    description: string;
    topic: string;
    tags: string;
    creator: string;
    banner: string;
    publicId: string;
}
interface UEvent {
    title?: string;
    description?: string;
    topic?: string;
    tags?: string;
    banner?: string;
    publicId?: string;
}

const events: RequestHandler = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        let newEvent: IEvent = {
            title: data.title,
            description: JSON.stringify(data.description.ops),
            topic: data.topic,
            tags: JSON.parse(data.tags),
            creator: req.user._id,
            banner: req.file ? req.file.path : undefined,
            publicId: req.file ? req.file.filename : undefined,
        };

        await Event.create(newEvent);
    } catch (err) {
        console.log(err);
    }
};

const eventUpdate: RequestHandler = async (req, res, next) => {
    console.log(req.file);
    try {
        const data = JSON.parse(req.body.data);
        let updateEvent: UEvent = {
            title: data.title,
            description: JSON.stringify(data.description.ops),
            topic: data.topic,
            tags: JSON.parse(data.tags),
        };

        if (req.file) {
            updateEvent.banner = req.file.path;
            updateEvent.publicId = req.file.filename;
        }

        await Event.findByIdAndUpdate(req.params.id, updateEvent);

        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        console.log(err);
    }
};

const eventDelete: RequestHandler = async (req, res, next) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        console.log(err);
    }
};

export default {
    events,
    eventUpdate,
    eventDelete,
};
