"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("axios");
const axios_1 = __importDefault(require("axios"));
exports.default = () => {
    const form = document.getElementById('login-form');
    const btnSubmit = document.querySelector('.btn-login');
    const emailField = document.querySelector('[name=email');
    const passwordField = document.querySelector('[name=password');
    btnSubmit === null || btnSubmit === void 0 ? void 0 : btnSubmit.addEventListener('click', (ev) => {
        if (!form.checkValidity())
            return;
        ev.preventDefault();
        axios_1.default
            .post('http://localhost:7000/login', { email: emailField.value, password: passwordField.value })
            .then((response) => {
            if (response.data.status === 'success') {
                window.location.href = '/me';
            }
        })
            .catch((err) => {
            emailField.setCustomValidity('Email und Passwort passen nicht.');
            passwordField.setCustomValidity('Email und Passwort passen nicht.');
            btnSubmit.click();
            emailField.oninput = function () {
                emailField.setCustomValidity('');
            };
            passwordField.oninput = function () {
                passwordField.setCustomValidity('');
            };
        });
    });
};
//# sourceMappingURL=login.js.map