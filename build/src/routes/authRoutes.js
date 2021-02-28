"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.Router();
router.post('/signup', authController_1.default.signup);
router.post('/login', authController_1.default.login);
router.get('/signout', authController_1.default.signout);
module.exports = router;
//# sourceMappingURL=authRoutes.js.map