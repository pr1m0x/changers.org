export default () => {
    const btnSearch = document.querySelector('.btn-search');
    const inputSearch = document.querySelector('.search-input') as HTMLInputElement;

    btnSearch?.addEventListener('click', (ev) => {
        window.location.href = `/search?q=${inputSearch.value}`;
    });
};
