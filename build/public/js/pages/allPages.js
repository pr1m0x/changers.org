"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const $navBar = document.getElementById('user-menu');
        if ($navBar) {
            $navBar.addEventListener('click', (ev) => {
                const $target = document.getElementById('user-menu-dropwdown');
                if ($target) {
                    $target.classList.toggle('hidden');
                }
            });
        }
        const $mobileSandwich = document.getElementById('mobile-sandwich');
        if ($mobileSandwich) {
            $mobileSandwich.addEventListener('click', (ev) => {
                const $target = document.getElementById('small-device-menu');
                if ($target) {
                    $target.classList.toggle('hidden');
                }
            });
        }
    });
};
//# sourceMappingURL=allPages.js.map