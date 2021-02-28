"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_tag0x = exports.preSelectedTags = void 0;
const tagAlert = () => {
    const alertContainer = document.querySelector('.tag0x__limit-reached');
    if (!alertContainer) {
        const parent = document.querySelector('.tag0x__wrapper');
        const alert = `
    <div class="tag0x__limit-reached"> 
        <div> 
            <h4>Limit erreicht</h4>
            <p>Bitte maximal 15 Suchbegriffe auswählen.</p>
        </div>
    </div>
    `;
        parent.insertAdjacentHTML('beforebegin', alert);
        setTimeout(() => {
            document.querySelector('.tag0x__limit-reached').remove();
        }, 2000);
    }
};
const createTag0xWrapper = (init) => {
    const tag0xWrapper = document.createElement('DIV');
    tag0xWrapper.classList.add('tag0x__wrapper');
    init.parentNode.appendChild(tag0xWrapper);
    const tag0xContainer = document.createElement('DIV');
    tag0xContainer.classList.add('tag0x__container');
    tag0xContainer.appendChild(init);
    tag0xWrapper.appendChild(tag0xContainer);
    const tag0xSearchContainer = document.createElement('DIV');
    tag0xSearchContainer.classList.add('tag0x__search__container');
    const tag0xSearchResults = document.createElement('UL');
    tag0xSearchResults.classList.add('tag0x__results');
    tag0xSearchContainer.appendChild(tag0xSearchResults);
    tag0xWrapper.appendChild(tag0xSearchContainer);
};
const showSearchContainer = (searchContainer, searchInput) => {
    searchContainer.classList.add('show');
    searchInput.innerHTML = '';
};
const hideSearchContainer = (searchContainer, searchInput) => {
    searchContainer.classList.remove('show');
    searchInput.value = '';
};
const refreshWhitelist = (whitelist, element) => {
    if (whitelist.indexOf(element) !== -1) {
        whitelist.splice(whitelist.indexOf(element), 1);
    }
    else {
        whitelist.push(element);
    }
};
const createTag0xTag = (element) => {
    const tag0xItem = document.createElement('DIV');
    tag0xItem.classList.add('tag0x__item');
    tag0xItem.innerHTML = `
    <div class="d-flex align-items-center"><span>${element}</span></div>
    <div class="tag0x__removeBtn"></div>
    `;
    return tag0xItem;
};
const inserTag0xTag = (tag) => {
    const tag0xContainer = document.querySelector('.tag0x__container');
    tag0xContainer.insertBefore(tag, tag0xContainer.childNodes[tag0xContainer.children.length - 1]);
};
const preSelectedTags = () => {
    const tag0x = document.querySelector('.tag0x__dropdown');
    if (!tag0x || tag0x.getAttribute('data-picked-tags').length < 6)
        return;
    const pickedTags = JSON.parse(tag0x.getAttribute('data-picked-tags'));
    return pickedTags;
};
exports.preSelectedTags = preSelectedTags;
const init_tag0x = (preSelectedTags) => {
    const tag0x = document.querySelector('.tag0x__dropdown');
    if (!tag0x)
        return;
    createTag0xWrapper(tag0x);
    const tag0xWrapper = document.querySelector('.tag0x__wrapper');
    const tag0xContainer = document.querySelector('.tag0x__container');
    const tagSearchContainer = document.querySelector('.tag0x__search__container');
    const tagResultsUl = document.querySelector('.tag0x__results');
    let whitelist;
    if (preSelectedTags) {
        const parsedTags = JSON.parse(tag0x.getAttribute('data-tag-items'));
        whitelist = parsedTags.filter((el) => !preSelectedTags.includes(el));
        preSelectedTags.forEach((el) => {
            const tag0xTag = createTag0xTag(el);
            inserTag0xTag(tag0xTag);
        });
    }
    else {
        whitelist = JSON.parse(tag0x.getAttribute('data-tag-items'));
    }
    tag0x.addEventListener('focus', (ev) => {
        tag0xContainer.classList.add('activeSearch');
        tag0x.addEventListener('keyup', (ev) => {
            showSearchContainer(tagSearchContainer, tag0x);
            const globalRegex = RegExp(`${ev.target.value}`, 'gi');
            tagResultsUl.innerHTML = '';
            whitelist
                .filter((el) => el.match(globalRegex))
                .forEach((el) => {
                tagResultsUl.innerHTML += `<li class="tag0x__li__item">${el}</li>`;
            });
            if (tagResultsUl.innerHTML === '' && ev.target.value.length > 0) {
                tagResultsUl.innerHTML += `<li class="tag0x__errMsg">Für <span class="bold"><b>"${ev.target.value}"</b></span> haben wir leider keine Suchergebnisse gefunden</li>`;
            }
        });
    });
    tag0xContainer.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('tag0x__removeBtn')) {
            refreshWhitelist(whitelist, ev.target.parentNode.querySelector('span').innerHTML);
            const removeBtnParent = ev.target.parentNode;
            removeBtnParent.classList.add('shrink');
            const computedWidth = window.getComputedStyle(removeBtnParent).getPropertyValue('width');
            removeBtnParent.style.width = computedWidth;
            removeBtnParent.addEventListener('animationend', () => {
                tag0x.focus();
                removeBtnParent.remove();
                let pickedTags = [];
                tag0x.parentElement.childNodes.forEach((el) => {
                    if (el.tagName === 'INPUT')
                        return;
                    pickedTags.push(el.innerText);
                });
                tag0x.setAttribute('data-picked-tags', `${JSON.stringify(pickedTags).toLowerCase()}`);
            });
        }
    });
    tagSearchContainer.addEventListener('click', (ev) => {
        if (!ev.target.classList.contains('tag0x__li__item'))
            return;
        let pickedTags = [];
        tag0x.focus();
        hideSearchContainer(tagSearchContainer, tag0x);
        const tag0xTag = createTag0xTag(ev.target.innerHTML);
        if (JSON.parse(tag0x.getAttribute('data-picked-tags')).length > 14)
            return tagAlert();
        inserTag0xTag(tag0xTag);
        refreshWhitelist(whitelist, ev.target.innerHTML);
        tag0x.parentElement.childNodes.forEach((el) => {
            if (el.tagName === 'INPUT')
                return;
            pickedTags.push(el.innerText);
        });
        tag0x.setAttribute('data-picked-tags', `${JSON.stringify(pickedTags).toLowerCase()}`);
    });
    document.addEventListener('click', (ev) => {
        if (!ev.target.closest('.tag0x__wrapper')) {
            tag0xContainer.classList.remove('activeSearch');
            tagSearchContainer.classList.remove('show');
            tag0x.value = '';
        }
    });
};
exports.init_tag0x = init_tag0x;
//# sourceMappingURL=tag0x.js.map