import 'axios';
import axios from 'axios';

export default () => {
    const form = document.getElementById('login-form') as HTMLFormElement;
    const btnSubmit = document.querySelector('.btn-login') as HTMLFormElement;
    const emailField = document.querySelector('[name=email') as HTMLInputElement;
    const passwordField = document.querySelector('[name=password') as HTMLInputElement;

    btnSubmit?.addEventListener('click', (ev) => {
        if (!form.checkValidity()) return;

        ev.preventDefault();
        axios
            .post('http://localhost:7000/login', { email: emailField.value, password: passwordField.value })
            .then((response) => {
                if (response.data.status === 'success') {
                    window.location.href = '/me';
                }
            })
            .catch((err) => {
                emailField.setCustomValidity('Email und Passwort passen nicht.');
                passwordField.setCustomValidity('Email und Passwort passen nicht.');
                btnSubmit.click();
                emailField.oninput = function () {
                    emailField.setCustomValidity('');
                };
                passwordField.oninput = function () {
                    passwordField.setCustomValidity('');
                };
            });
    });
};
