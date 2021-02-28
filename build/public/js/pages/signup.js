"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = () => {
    const form = document.getElementById('signup-form');
    const formInput = document.querySelectorAll('input');
    const btnSubmit = document.querySelector('.btn-submit');
    const usernameField = document.querySelector('[name=username]');
    const emailField = document.querySelector('[name=email');
    const passwordField = document.querySelector('[name=password');
    usernameField.oninvalid = function (err) {
        usernameField.setCustomValidity('Wähle einen Benutzernamen mit 5 - 30 Zeichen aus Buchstaben und Zahlen.');
    };
    passwordField.oninvalid = function (err) {
        passwordField.setCustomValidity('Mindestens 8 Zeichen und Kombination aus Groß-, Kleinbuchstaben, Sonderzeichen und Zahlen.');
    };
    form.oninput = function (err) {
        usernameField.setCustomValidity('');
        passwordField.setCustomValidity('');
    };
    btnSubmit === null || btnSubmit === void 0 ? void 0 : btnSubmit.addEventListener('click', (ev) => {
        if (!form.checkValidity())
            return;
        ev.preventDefault();
        let formdata = {};
        formInput.forEach((el) => {
            formdata[el.name] = el.value;
        });
        axios_1.default
            .post('http://localhost:7000/signup', formdata)
            .then((response) => {
            if (response.data.status === 'success') {
                window.location.href = '/me';
            }
        })
            .catch((err) => {
            console.log('ERORORORO');
            if (err.response.data.indicator === 'username') {
                usernameField.setCustomValidity('Benutzername bereits vergeben');
                btnSubmit.click();
                usernameField.oninput = function () {
                    usernameField.setCustomValidity('');
                };
            }
            else {
                emailField.setCustomValidity('Email bereits vergeben');
                btnSubmit.click();
                emailField.oninput = function () {
                    emailField.setCustomValidity('');
                };
            }
        });
    });
};
//# sourceMappingURL=signup.js.map