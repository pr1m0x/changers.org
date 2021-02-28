"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const viewController_1 = __importDefault(require("../controllers/viewController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.Router();
router.get('/', viewController_1.default.home);
router.get('/event/:id', viewController_1.default.eventDetail);
router.get('/search', viewController_1.default.search);
router.get('/search-result', viewController_1.default.searchResult);
router.get('/start', viewController_1.default.start);
router.get('/login', viewController_1.default.login);
router.get('/signup', viewController_1.default.signup);
router.get('/me', authController_1.default.protect, viewController_1.default.me);
router.get('/profile', viewController_1.default.profile);
router.get('/user/:id/edit', viewController_1.default.userEdit);
router.get('/event-preview', viewController_1.default.eventPreview);
router.get('/event/:id/edit', viewController_1.default.eventEdit);
module.exports = router;
//# sourceMappingURL=viewRoutes.js.map