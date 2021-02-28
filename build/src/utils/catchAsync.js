"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (cb) => {
    return (req, res, next) => {
        try {
            cb(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
};
//# sourceMappingURL=catchAsync.js.map