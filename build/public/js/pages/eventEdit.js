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
const tag0x_1 = require("../utils/tag0x");
const axios_1 = __importDefault(require("axios"));
const handleQuill = (delta) => {
    const quill = new Quill('#editor-container', {
        modules: {
            toolbar: [['bold', 'italic'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']],
        },
        placeholder: 'Erzähle uns deine Geschichte',
        theme: 'snow',
    });
    quill.setContents(JSON.parse(delta));
    return quill;
};
const handleDropzone = () => {
    Dropzone.autoDiscover = false;
    return new Dropzone('#my-dropzone', {
        autoProcessQueue: false,
        maxFiles: 1,
        acceptedFiles: 'image/jpeg,image/jpg,image/png',
        maxFilesize: 2,
        dictFileTooBig: 'Ihr Titelbild ist zu groß',
        dictInvalidFileType: 'Dieses Format unterstützen wir nicht',
        dictRemoveFile: '<span class="btn btn-sm btn-white underline">Titelbild entfernen</span>',
        thumbnailWidth: 500,
        thumbnailHeight: 250,
        addRemoveLinks: true,
        uploadMultiple: false,
        parallelUploads: 1,
        maxfilesexceeded: function (file) {
            this.removeAllFiles();
            this.addFile(file);
        },
        init: function () {
            document.querySelector('.dz__err__close').addEventListener('click', () => {
                document.querySelector('.dz-message').classList.remove('blurr0x');
                document.querySelector('.dz_error_message').remove();
            });
            this.on('addedfile', function (file) {
                document.querySelector('.dz-message').style.display = 'none';
            }),
                this.on('removedfile', function (file) {
                    document.querySelector('.dz-message').style.display = 'block';
                });
        },
        error: function (file, err) {
            this.removeFile(file);
            if (err === 'You can not upload any more files.')
                return;
            const dropzoneContainer = document.getElementById('my-dropzone');
            const errMsg = document.createElement('DIV');
            errMsg.classList.add('dz_error_message');
            errMsg.innerHTML = `
        <div class="errorBox">
            <img class="h-40 img-fluid mb-3" src="/images/svg/sorry_fill.svg" alt="Image Description">
            <div class="errText">
                <h4 class="text-gray-500 font-bold mb-1">Entschuldigung. ${err}.</h4>
                <p class="text-gray-500 text-sm font-weight-light d-block mt-2">Bitte stellen Sie sicher, dass Ihr Titelbild den Vorgaben entspricht.</small>
            </div>
        </div>
        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary dz__err__close" data-dismiss="modal" aria-label="Close">
            <i class="tio-clear tio-lg" aria-hidden="true"></i>
        </button>
        `;
            dropzoneContainer.appendChild(errMsg);
            setTimeout(() => {
                document.querySelector('.dz-message').classList.add('blurr0x');
                document.querySelector('.dz_error_message').classList.add('error_animation');
            }, 100);
            document.querySelector('.dz__err__close').addEventListener('click', () => {
                document.querySelector('.dz-message').classList.remove('blurr0x');
                document.querySelector('.dz_error_message').remove();
            });
        },
    });
};
const getFormData = (quill) => {
    var _a;
    const inputs = [...document.querySelectorAll('input, select, textarea')];
    let dataObj = {};
    inputs.forEach((input) => {
        if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA')
            if (input.value) {
                dataObj[input.name] = input.value;
            }
    });
    dataObj.tags = (_a = document.querySelector('.tag0x__dropdown')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-picked-tags');
    dataObj.description = quill.getContents();
    return dataObj;
};
const sendFormData = (dataObj, dropzone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idFromUrl = window.location.pathname.split('/')[2];
        const fd = new FormData();
        fd.append('data', JSON.stringify(dataObj));
        fd.append('banner', dropzone.files[0]);
        const response = yield axios_1.default({
            method: 'PATCH',
            url: `/api/v1/events/${idFromUrl}`,
            data: fd,
            headers: {
                'content-type': `multipart/form-data`,
            },
        });
        if (response.data.status === 'success') {
            window.location.href = `/event/${idFromUrl}`;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = () => {
    var _a, _b, _c;
    const form = document.querySelector('form');
    const btnSubmit = document.querySelector('.btn-submit');
    const selectedTags = (_a = document.querySelector('.tag0x__dropdown')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-picked-tags');
    tag0x_1.init_tag0x(JSON.parse(selectedTags));
    const dropzone = handleDropzone();
    const delta = (_b = document.getElementById('editor-container')) === null || _b === void 0 ? void 0 : _b.getAttribute('data-delta');
    const quill = handleQuill(delta);
    btnSubmit === null || btnSubmit === void 0 ? void 0 : btnSubmit.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(form === null || form === void 0 ? void 0 : form.checkValidity()))
            return;
        ev.preventDefault();
        const dataObj = getFormData(quill);
        sendFormData(dataObj, dropzone);
    }));
    (_c = document.querySelector('.btn-delete')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idFromUrl = window.location.pathname.split('/')[2];
            const response = yield axios_1.default({
                method: 'DELETE',
                url: `/api/v1/events/${idFromUrl}`,
            });
            if (response.data.status === 'success') {
                window.location.href = `/me`;
            }
        }
        catch (err) {
            console.log(err);
        }
    }));
};
//# sourceMappingURL=eventEdit.js.map