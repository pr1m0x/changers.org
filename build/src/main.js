"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sampleHome_1 = __importDefault(require("../public/js/pages/sampleHome"));
const allPages_1 = __importDefault(require("../public/js/pages/allPages"));
const start_1 = __importDefault(require("../public/js/pages/start"));
const signup_1 = __importDefault(require("../public/js/pages/signup"));
const login_1 = __importDefault(require("../public/js/pages/login"));
const userEdit_1 = __importDefault(require("../public/js/pages/userEdit"));
const eventEdit_1 = __importDefault(require("../public/js/pages/eventEdit"));
const search_1 = __importDefault(require("../public/js/pages/search"));
allPages_1.default();
if (window.location.pathname === '/') {
    sampleHome_1.default();
}
if (window.location.pathname === '/signup') {
    signup_1.default();
}
if (window.location.pathname === '/login') {
    login_1.default();
}
if (window.location.pathname === '/start') {
    start_1.default();
}
if ((window.location.pathname.includes('user') && window.location.pathname.includes('edit')) ||
    window.location.pathname.includes('profile')) {
    userEdit_1.default();
}
if (window.location.pathname.includes('event') && window.location.pathname.includes('edit')) {
    eventEdit_1.default();
}
if (window.location.pathname.includes('search')) {
    search_1.default();
}
//# sourceMappingURL=main.js.map