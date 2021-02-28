"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const router = express_1.Router();
router.patch('/', cloudinary_1.default.uploader.single('avatar'), userController_1.default.userUpdate);
module.exports = router;
//# sourceMappingURL=userRoutes.js.map