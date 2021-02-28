import { Request, Response, NextFunction } from 'express';

export default (cb: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};
