"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = __importDefault(require("../controllers/eventController"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const router = express_1.Router();
router.post('/', cloudinary_1.default.uploader.single('banner'), eventController_1.default.events);
router.patch('/:id', cloudinary_1.default.uploader.single('banner'), eventController_1.default.eventUpdate);
router.delete('/:id', eventController_1.default.eventDelete);
module.exports = router;
//# sourceMappingURL=eventRoutes.js.map