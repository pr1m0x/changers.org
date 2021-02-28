"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const swiper_1 = __importStar(require("swiper"));
const jumpToSlide = (numberPage) => {
    new swiper_1.default('.swiper-container').slideTo(numberPage, 1000, false);
};
const highlightSubSlide = ({ target }) => {
    const subSlideParent = target.closest('.related-box');
    subSlideParent.classList.add('active-slide');
    subSlideParent.closest('.related-posts').childNodes.forEach((element) => {
        element.classList.remove('active-slide');
    });
    subSlideParent.classList.add('active-slide');
};
const fakeArrowHandling = () => {
    document.querySelectorAll('.fake-arrow').forEach((arrow) => {
        arrow.addEventListener('click', (ev) => {
            const currentSlide = document.querySelector('.active-slide');
            let slideID = Number(currentSlide.getAttribute('data-slide-id'));
            if (ev.target.classList.contains('fake-arrow-prev')) {
                if (slideID === 1)
                    return;
                jumpToSlide(slideID - 1);
                document.querySelector('.swiper-button-prev');
                const previousSlide = currentSlide === null || currentSlide === void 0 ? void 0 : currentSlide.previousElementSibling;
                highlightSubSlide({ target: previousSlide });
            }
            else {
                if (slideID === 6)
                    return;
                jumpToSlide(slideID + 1);
                document.querySelector('.swiper-button-next');
                const nextSlide = currentSlide === null || currentSlide === void 0 ? void 0 : currentSlide.nextElementSibling;
                highlightSubSlide({ target: nextSlide });
            }
        });
    });
};
exports.default = () => {
    fakeArrowHandling();
    document.addEventListener('DOMContentLoaded', () => {
        swiper_1.default.use([swiper_1.Navigation]);
        new swiper_1.default('.swiper-container', {
            loop: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        document.querySelectorAll('.related-box').forEach((button) => {
            button.addEventListener('click', (ev) => {
                const clickedSlide = ev.target;
                const parentNode = clickedSlide.parentNode;
                const slideID = parentNode.getAttribute('data-slide-id');
                highlightSubSlide(ev);
                jumpToSlide(Number(slideID));
            });
        });
    });
};
//# sourceMappingURL=sampleHome.js.map