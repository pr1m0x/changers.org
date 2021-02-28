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
const axios_1 = __importDefault(require("axios"));
exports.default = () => {
    const form = document.querySelector('form');
    const btnSubmit = document.querySelector('.btn-submit');
    btnSubmit === null || btnSubmit === void 0 ? void 0 : btnSubmit.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(form === null || form === void 0 ? void 0 : form.checkValidity()))
            return;
        ev.preventDefault();
        const inputs = [...document.querySelectorAll('input, select, textarea')];
        let dataObj = {};
        inputs.forEach((input) => {
            if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA')
                if (input.value) {
                    dataObj[input.name] = input.value;
                }
        });
        try {
            const fd = new FormData();
            fd.append('data', JSON.stringify(dataObj));
            const response = yield axios_1.default({
                method: 'PATCH',
                url: '/api/v1/user',
                data: fd,
                headers: {
                    'content-type': `multipart/form-data`,
                },
            });
            if (response.data.status === 'success') {
                window.location.href = '/me';
            }
        }
        catch (err) { }
    }));
};
//# sourceMappingURL=userEdit.js.map