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
require("alpinejs");
const axios_1 = __importDefault(require("axios"));
const tag0x_1 = require("../utils/tag0x");
const formError_1 = __importDefault(require("../utils/formError"));
const handleQuill = () => {
    const quill = new Quill('#editor-container', {
        modules: {
            toolbar: [['bold', 'italic'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']],
        },
        placeholder: 'Erzähle uns deine Geschichte',
        theme: 'snow',
    });
    var limit = 1000;
    const charsCount = document.querySelector('.chars-left');
    charsCount.innerText = `${1000 - quill.getLength()}`;
    quill.on('text-change', function () {
        const quillLength = quill.getLength();
        const hiddenInput = document.querySelector('.hidden-input');
        hiddenInput.value = quillLength;
        if (quillLength < limit) {
            charsCount.innerText = `${limit - quill.getLength()}`;
        }
        else {
            const editorMsg = document.querySelector('.editor-message');
            editorMsg.innerText = `
        Großartig — Ihre Petition ist derzeit ${quill.getLength()} Zeichen lang — das ist innerhalb der Beschreibungslänge einiger der erfolgreichsten Petitionen!
        `;
        }
    });
    return quill;
};
const setUpMultiStepForm = () => {
    var _a;
    const script = ` 
        function app() {
            return {
                step: 1,
            };
        }
        `;
    document.querySelector('.injected-script').innerHTML = script;
    (_a = document.querySelector('.multistep-form')) === null || _a === void 0 ? void 0 : _a.setAttribute('x-data', 'app()');
};
const setUpDropzone = () => {
    Dropzone.autoDiscover = false;
    return new Dropzone('#my-dropzone', {
        autoProcessQueue: false,
        maxFiles: 1,
        acceptedFiles: 'image/jpeg,image/jpg,image/png',
        maxFilesize: 2,
        dictFileTooBig: 'Ihr Titelbild ist zu groß',
        dictInvalidFileType: 'Dieses Format unterstützen wir nicht',
        dictRemoveFile: '<span class="btn btn-sm btn-white">Titelbild entfernen</span>',
        thumbnailWidth: 500,
        thumbnailHeight: 250,
        addRemoveLinks: true,
        uploadMultiple: false,
        parallelUploads: 1,
        maxFiles: 1,
        maxfilesexceeded: function (file) {
            this.removeAllFiles();
            this.addFile(file);
        },
        init: function () {
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
exports.default = () => {
    setUpMultiStepForm();
    tag0x_1.init_tag0x(null);
    const quill = handleQuill();
    const dropzone = setUpDropzone();
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');
    const btnSubmit = document.querySelector('.btn-submit');
    let counter = 0;
    btnPrev.addEventListener('click', () => {
        counter--;
    });
    btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener('click', (ev) => {
        if (counter === 5) {
            counter++;
        }
        if (counter === 4) {
            counter++;
        }
        if (counter === 3) {
            counter++;
        }
        if (counter === 2) {
            counter++;
        }
        if (counter === 1) {
            const titleInput = document.querySelector('[name="title"]');
            if (titleInput.value.length === 0) {
                btnPrev.click();
                formError_1.default(titleInput, 'Bitte füllen Sie dieses Feld aus.');
            }
            else {
                counter++;
            }
        }
        if (counter === 0) {
            counter++;
        }
    });
    const topicBoxes = [...document.querySelectorAll('.topic-box')];
    topicBoxes.forEach((el) => {
        el.addEventListener('click', (ev) => {
            document.querySelectorAll('.active-box').forEach((el) => el.classList.remove('active-box'));
            ev.target.closest('.topic-box').firstElementChild.classList.toggle('active-box');
        });
    });
    btnSubmit.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const topicData = document.querySelector('.active-box');
        const titleData = document.querySelector('[name="title"]');
        (_a = document.querySelector('.tracking-wide')) === null || _a === void 0 ? void 0 : _a.remove();
        const formData = {
            title: titleData.value,
            description: quill.getContents(),
            tags: ((_b = document.querySelector('.tag0x__dropdown')) === null || _b === void 0 ? void 0 : _b.getAttribute('data-picked-tags')) || '',
        };
        if (topicData !== null) {
            const topic = topicData.closest('.topic-box').lastElementChild;
            formData.topic = topic.innerText;
        }
        const fd = new FormData();
        fd.append('data', JSON.stringify(formData));
        fd.append('banner', dropzone.files[0]);
        try {
            const response = yield axios_1.default({
                method: 'POST',
                url: '/api/v1/events',
                data: fd,
                headers: {
                    'content-type': `multipart/form-data`,
                },
            });
            if (response.data.status === 'success') {
            }
        }
        catch (err) {
            console.log(err);
        }
    }));
};
//# sourceMappingURL=start.js.map