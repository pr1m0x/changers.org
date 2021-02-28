import axios from 'axios';

export default () => {
    const form = document.getElementById('signup-form') as HTMLFormElement;
    const formInput = document.querySelectorAll('input');
    const btnSubmit = document.querySelector('.btn-submit') as HTMLFormElement;
    const usernameField = document.querySelector('[name=username]') as HTMLInputElement;
    const emailField = document.querySelector('[name=email') as HTMLInputElement;
    const passwordField = document.querySelector('[name=password') as HTMLInputElement;

    usernameField.oninvalid = function (err) {
        usernameField.setCustomValidity('Wähle einen Benutzernamen mit 5 - 30 Zeichen aus Buchstaben und Zahlen.');
    };

    passwordField.oninvalid = function (err) {
        passwordField.setCustomValidity(
            'Mindestens 8 Zeichen und Kombination aus Groß-, Kleinbuchstaben, Sonderzeichen und Zahlen.',
        );
    };
    form.oninput = function (err) {
        usernameField.setCustomValidity('');
        passwordField.setCustomValidity('');
    };

    btnSubmit?.addEventListener('click', (ev) => {
        if (!form.checkValidity()) return;

        ev.preventDefault();

        let formdata: any = {};
        formInput.forEach((el) => {
            formdata[el.name] = el.value;
        });

        axios
            .post('http://localhost:7000/signup', formdata)
            .then((response) => {
                if (response.data.status === 'success') {
                    window.location.href = '/me';
                }
            })
            .catch((err) => {
                console.log('ERORORORO');
                if (err.response.data.indicator === 'username') {
                    usernameField.setCustomValidity('Benutzername bereits vergeben');
                    btnSubmit.click();
                    usernameField.oninput = function () {
                        usernameField.setCustomValidity('');
                    };
                } else {
                    emailField.setCustomValidity('Email bereits vergeben');
                    btnSubmit.click();
                    emailField.oninput = function () {
                        emailField.setCustomValidity('');
                    };
                }
            });
    });
};
