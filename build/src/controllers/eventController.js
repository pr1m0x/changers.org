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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../models/Event"));
const events = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = JSON.parse(req.body.data);
        let newEvent = {
            title: data.title,
            description: JSON.stringify(data.description.ops),
            topic: data.topic,
            tags: JSON.parse(data.tags),
            creator: req.user._id,
            banner: req.file ? req.file.path : undefined,
            publicId: req.file ? req.file.filename : undefined,
        };
        yield Event_1.default.create(newEvent);
    }
    catch (err) {
        console.log(err);
    }
});
const eventUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    try {
        const data = JSON.parse(req.body.data);
        let updateEvent = {
            title: data.title,
            description: JSON.stringify(data.description.ops),
            topic: data.topic,
            tags: JSON.parse(data.tags),
        };
        if (req.file) {
            updateEvent.banner = req.file.path;
            updateEvent.publicId = req.file.filename;
        }
        yield Event_1.default.findByIdAndUpdate(req.params.id, updateEvent);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        console.log(err);
    }
});
const eventDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Event_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = {
    events,
    eventUpdate,
    eventDelete,
};
//# sourceMappingURL=eventController.js.map