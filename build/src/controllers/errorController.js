"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (process.env.MODE === 'DEVELOPMENT') {
        if (!err.constructed) {
            res.status(500).json({
                status: 'fail',
                message: 'Server Error',
                data: err,
                indicator: err.keyValue,
            });
            console.log(err);
        }
        else {
            res.status(500).json({
                status: 'fail',
                statusCode: err.status,
                message: err.message,
                indicator: err.indicator,
                data: err,
            });
            console.log(err);
        }
    }
    else {
        if (!err.constructed) {
            res.render('error', {
                status: 500,
                message: 'Es gab ein Problem mit dem Server. Bitte versucnen Sie es erneut.',
            });
        }
        else {
            if (err.status === 403 || err.status === 404) {
                res.render('error', {
                    status: err.status || 404,
                    message: err.message || 'Diese Seite existiert nicht.',
                });
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    statusCode: err.status,
                    message: err.message,
                    indicator: err.indicator,
                    data: err,
                });
            }
        }
    }
};
exports.default = { errorHandler };
//# sourceMappingURL=errorController.js.map