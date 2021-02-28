export default () => {
    document.addEventListener('DOMContentLoaded', () => {
        const $navBar = document.getElementById('user-menu') as HTMLButtonElement;
        if ($navBar) {
            $navBar.addEventListener('click', (ev) => {
                const $target = document.getElementById('user-menu-dropwdown');
                if ($target) {
                    $target.classList.toggle('hidden');
                }
            });
        }
        const $mobileSandwich = document.getElementById('mobile-sandwich') as HTMLElement;

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
