//@ts-ignore

import { init_tag0x } from '../utils/tag0x';
import axios from 'axios';

const handleQuill = (delta) => {
    // • HANDLE QUILL • //
    const quill = new Quill('#editor-container', {
        modules: {
            toolbar: [['bold', 'italic'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']],
        },
        placeholder: 'Erzähle uns deine Geschichte',
        theme: 'snow',
    });

    quill.setContents(JSON.parse(delta));

    // var limit = 1000;
    // const charsCount = document.querySelector('.chars-left') as HTMLElement;
    // charsCount.innerText = `${1000 - quill.getLength()}`;

    // quill.on('text-change', function () {
    //     const quillLength = quill.getLength();
    //     const hiddenInput = document.querySelector('.hidden-input') as HTMLInputElement;
    //     hiddenInput.value = quillLength;

    //     if (quillLength < limit) {
    //         charsCount.innerText = `${limit - quill.getLength()}`;
    //     } else {
    //         const editorMsg = document.querySelector('.editor-message') as HTMLElement;
    //         editorMsg.innerText = `
    //     Großartig — Ihre Petition ist derzeit ${quill.getLength()} Zeichen lang — das ist innerhalb der Beschreibungslänge einiger der erfolgreichsten Petitionen!
    //     `;
    //     }
    // });

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
            if (err === 'You can not upload any more files.') return;
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
    const inputs = [...document.querySelectorAll('input, select, textarea')];
    let dataObj: any = {};

    // ▼ GET INPUT DATA //
    inputs.forEach((input: any) => {
        if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA')
            if (input.value) {
                dataObj[input.name] = input.value;
            }
    });

    // ▼ GET TAGS //
    dataObj.tags = document.querySelector('.tag0x__dropdown')?.getAttribute('data-picked-tags');

    // ▼ GET QUILL //
    dataObj.description = quill.getContents();

    return dataObj;
};

const sendFormData = async (dataObj: object, dropzone: any) => {
    try {
        const idFromUrl = window.location.pathname.split('/')[2];
        const fd = new FormData();
        fd.append('data', JSON.stringify(dataObj));
        fd.append('banner', dropzone.files[0]);
        const response = await axios({
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
    } catch (err) {
        console.log(err);
    }
};

export default () => {
    // • UPDATE EVENT • //
    const form = document.querySelector('form');
    const btnSubmit = document.querySelector('.btn-submit');

    // ▼ Init tag0x //
    const selectedTags: any = document.querySelector('.tag0x__dropdown')?.getAttribute('data-picked-tags');
    init_tag0x(JSON.parse(selectedTags));
    // ▼ Init dropzone //
    const dropzone = handleDropzone();
    // ▼ Init quill //
    const delta = document.getElementById('editor-container')?.getAttribute('data-delta');
    const quill = handleQuill(delta);

    // ▼ Check, read and send Formdata //
    btnSubmit?.addEventListener('click', async (ev) => {
        if (!form?.checkValidity()) return;
        ev.preventDefault();
        const dataObj = getFormData(quill);
        sendFormData(dataObj, dropzone);
    });

    // • DELETE EVENT • //
    document.querySelector('.btn-delete')?.addEventListener('click', async (ev) => {
        try {
            const idFromUrl = window.location.pathname.split('/')[2];

            const response = await axios({
                method: 'DELETE',
                url: `/api/v1/events/${idFromUrl}`,
            });
            if (response.data.status === 'success') {
                window.location.href = `/me`;
            }
        } catch (err) {
            console.log(err);
        }
    });
};
