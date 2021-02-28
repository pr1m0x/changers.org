import 'alpinejs';
import axios from 'axios';
import { init_tag0x } from '../utils/tag0x';
import formError from '../utils/formError';

const handleQuill = () => {
    // • HANDLE QUILL • //
    const quill = new Quill('#editor-container', {
        modules: {
            toolbar: [['bold', 'italic'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']],
        },
        placeholder: 'Erzähle uns deine Geschichte',
        theme: 'snow',
    });

    var limit = 1000;
    const charsCount = document.querySelector('.chars-left') as HTMLElement;
    charsCount.innerText = `${1000 - quill.getLength()}`;

    quill.on('text-change', function () {
        const quillLength = quill.getLength();
        const hiddenInput = document.querySelector('.hidden-input') as HTMLInputElement;
        hiddenInput.value = quillLength;

        if (quillLength < limit) {
            charsCount.innerText = `${limit - quill.getLength()}`;
        } else {
            const editorMsg = document.querySelector('.editor-message') as HTMLElement;
            editorMsg.innerText = `
        Großartig — Ihre Petition ist derzeit ${quill.getLength()} Zeichen lang — das ist innerhalb der Beschreibungslänge einiger der erfolgreichsten Petitionen!
        `;
        }
    });

    return quill;
};

const setUpMultiStepForm = () => {
    // • HANDLE alpine (inject app() function) • //
    const script = ` 
        function app() {
            return {
                step: 1,
            };
        }
        `;

    document.querySelector('.injected-script')!.innerHTML = script;
    document.querySelector('.multistep-form')?.setAttribute('x-data', 'app()');
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

export default () => {
    setUpMultiStepForm();
    init_tag0x(null);
    const quill = handleQuill();
    const dropzone = setUpDropzone();

    // • General DOM Connects • //
    const btnNext = document.querySelector('.btn-next')! as HTMLButtonElement;
    const btnPrev = document.querySelector('.btn-prev')! as HTMLButtonElement;
    const btnSubmit = document.querySelector('.btn-submit')! as HTMLButtonElement;

    // • HANDLE MULTISTEP PAGES • //
    let counter = 0;

    btnPrev.addEventListener('click', () => {
        counter--;
    });

    btnNext?.addEventListener('click', (ev) => {
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

        // • HANDLE PAGE 2 • //
        if (counter === 1) {
            const titleInput = document.querySelector('[name="title"]') as HTMLInputElement;
            if (titleInput!.value.length === 0) {
                btnPrev.click();
                formError(titleInput, 'Bitte füllen Sie dieses Feld aus.');
            } else {
                counter++;
            }
        }
        // • HANDLE PAGE 1 • //
        if (counter === 0) {
            counter++;
        }
    });

    // • Handle Topic Icon Boxes • //
    const topicBoxes = [...document.querySelectorAll('.topic-box')];
    topicBoxes.forEach((el) => {
        el.addEventListener('click', (ev: any) => {
            document.querySelectorAll('.active-box').forEach((el) => el.classList.remove('active-box'));
            ev.target.closest('.topic-box').firstElementChild.classList.toggle('active-box');
        });
    });

    // • READ FORM DATA • //
    btnSubmit.addEventListener('click', async (ev) => {
        const topicData = document.querySelector('.active-box') as HTMLInputElement;
        const titleData = document.querySelector('[name="title"]') as HTMLInputElement;
        document.querySelector('.tracking-wide')?.remove();

        interface FormData {
            topic?: any;
            title?: string;
            description?: object;
            tags?: string;
            image?: string;
        }

        const formData: FormData = {
            title: titleData.value,
            description: quill.getContents(),
            tags: document.querySelector('.tag0x__dropdown')?.getAttribute('data-picked-tags') || '',
        };

        if (topicData !== null) {
            const topic = topicData.closest('.topic-box')!.lastElementChild as HTMLElement;
            formData.topic = topic.innerText;
        }

        // • SEND FORM DATA • //
        const fd = new FormData();
        fd.append('data', JSON.stringify(formData));
        fd.append('banner', dropzone.files[0]);

        try {
            const response = await axios({
                method: 'POST',
                url: '/api/v1/events',
                data: fd,
                headers: {
                    'content-type': `multipart/form-data`,
                },
            });
            if (response.data.status === 'success') {
                // window.location.href = 'http://localhost:8000/success';
            }
        } catch (err) {
            // window.location.href = 'http://localhost:8000/error';
            console.log(err);
        }
    });
};
