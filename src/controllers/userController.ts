import { RequestHandler } from 'express';
import User from '../models/User';

const userUpdate: RequestHandler = async (req, res, next) => {
    try {
        const userData = JSON.parse(req.body.data);

        await User.findByIdAndUpdate(req.user._id, userData);
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        console.log(err);
    }
};

export default {
    userUpdate,
};
