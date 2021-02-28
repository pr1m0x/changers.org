"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
const RemoveErrOnInput = (field) => {
    field.addEventListener('input', () => {
        var _a;
        field.classList.remove('border-yellow-400');
        if (document.querySelector('.err-msg')) {
            (_a = document.querySelector('.err-msg')) === null || _a === void 0 ? void 0 : _a.remove();
        }
    });
};
exports.default = (field, message) => {
    if (!document.querySelector('.err-msg')) {
        var errorMsg = document.createElement('p');
        field.classList.add('border-yellow-400');
        errorMsg.className = 'err-msg text-yellow-400 text-sm mt-1';
        errorMsg.innerHTML = message;
        insertAfter(errorMsg, field);
        RemoveErrOnInput(field);
    }
};
//# sourceMappingURL=formError.js.map