"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const btnSearch = document.querySelector('.btn-search');
    const inputSearch = document.querySelector('.search-input');
    btnSearch === null || btnSearch === void 0 ? void 0 : btnSearch.addEventListener('click', (ev) => {
        window.location.href = `/search?q=${inputSearch.value}`;
    });
};
//# sourceMappingURL=search.js.map