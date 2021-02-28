import Swiper, { Navigation } from 'swiper';

const jumpToSlide = (numberPage: any) => {
    new Swiper('.swiper-container').slideTo(numberPage, 1000, false);
};

// Handles to highlighting of the subslides
const highlightSubSlide = ({ target }: any) => {
    const subSlideParent = target.closest('.related-box');
    subSlideParent.classList.add('active-slide');
    subSlideParent.closest('.related-posts').childNodes.forEach((element: HTMLImageElement) => {
        element.classList.remove('active-slide');
    });

    subSlideParent.classList.add('active-slide');
};

// Handles to highlighting of the subslides
const fakeArrowHandling = () => {
    document.querySelectorAll('.fake-arrow').forEach((arrow) => {
        arrow.addEventListener('click', (ev: any) => {
            const currentSlide = document.querySelector('.active-slide')!;
            let slideID = Number(currentSlide.getAttribute('data-slide-id'))!;

            if (ev.target.classList.contains('fake-arrow-prev')) {
                if (slideID === 1) return;
                jumpToSlide(slideID - 1);
                document.querySelector('.swiper-button-prev') as HTMLImageElement;
                const previousSlide = currentSlide?.previousElementSibling;
                highlightSubSlide({ target: previousSlide });
            } else {
                if (slideID === 6) return;
                jumpToSlide(slideID + 1);
                document.querySelector('.swiper-button-next') as HTMLImageElement;
                const nextSlide = currentSlide?.nextElementSibling;
                highlightSubSlide({ target: nextSlide });
            }
        });
    });
};

export default () => {
    // Handles click referencing of the arrow icons
    fakeArrowHandling();

    document.addEventListener('DOMContentLoaded', () => {
        // INIT Swiper
        Swiper.use([Navigation]);
        new Swiper('.swiper-container', {
            loop: true,
            allowTouchMove: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Create Prev/Next Relation
        document.querySelectorAll('.related-box')!.forEach((button) => {
            button.addEventListener('click', (ev) => {
                const clickedSlide = ev.target as HTMLElement;
                const parentNode = clickedSlide.parentNode as HTMLElement;
                const slideID = parentNode.getAttribute('data-slide-id');

                // Handles to highlighting of the sub-slides
                highlightSubSlide(ev);

                // RUN "jump to Slide" func
                jumpToSlide(Number(slideID));
            });
        });
    });
};
