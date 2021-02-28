function insertAfter(newNode: any, referenceNode: any) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const RemoveErrOnInput = (field: HTMLInputElement) => {
    field.addEventListener('input', () => {
        field.classList.remove('border-yellow-400');
        if (document.querySelector('.err-msg')) {
            document.querySelector('.err-msg')?.remove();
        }
    });
};

export default (field: HTMLInputElement, message: string) => {
    if (!document.querySelector('.err-msg')) {
        var errorMsg = document.createElement('p');
        field.classList.add('border-yellow-400');
        errorMsg.className = 'err-msg text-yellow-400 text-sm mt-1';
        errorMsg.innerHTML = message;
        insertAfter(errorMsg, field);

        RemoveErrOnInput(field);
    }
};
