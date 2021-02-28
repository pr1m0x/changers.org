import home from '../public/js/pages/sampleHome';
import allPages from '../public/js/pages/allPages';
import start from '../public/js/pages/start';
import signup from '../public/js/pages/signup';
import login from '../public/js/pages/login';
import userEdit from '../public/js/pages/userEdit';
import eventEdit from '../public/js/pages/eventEdit';
import search from '../public/js/pages/search';

allPages();

if (window.location.pathname === '/') {
    home();
}
if (window.location.pathname === '/signup') {
    signup();
}
if (window.location.pathname === '/login') {
    login();
}
if (window.location.pathname === '/start') {
    start();
}

if (
    (window.location.pathname.includes('user') && window.location.pathname.includes('edit')) ||
    window.location.pathname.includes('profile')
) {
    userEdit();
}

if (window.location.pathname.includes('event') && window.location.pathname.includes('edit')) {
    eventEdit();
}

if (window.location.pathname.includes('search')) {
    search();
}
