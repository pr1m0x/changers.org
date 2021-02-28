import axios from 'axios';

export default () => {
    const form = document.querySelector('form');
    const btnSubmit = document.querySelector('.btn-submit');

    btnSubmit?.addEventListener('click', async (ev) => {
        if (!form?.checkValidity()) return;
        ev.preventDefault();

        const inputs = [...document.querySelectorAll('input, select, textarea')];
        let dataObj: any = {};

        inputs.forEach((input: any) => {
            if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA')
                if (input.value) {
                    dataObj[input.name] = input.value;
                }
        });

        try {
            const fd = new FormData();
            fd.append('data', JSON.stringify(dataObj));

            const response = await axios({
                method: 'PATCH',
                url: '/api/v1/user',
                data: fd,
                headers: {
                    'content-type': `multipart/form-data`,
                },
            });
            if (response.data.status === 'success') {
                window.location.href = '/me';
            }
        } catch (err) {}
    });
};
