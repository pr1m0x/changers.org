"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDelta = void 0;
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const convertDelta = (jsonDelta) => {
    const obj = JSON.parse(jsonDelta);
    var converter = new QuillDeltaToHtmlConverter(obj, {});
    return converter.convert();
};
exports.convertDelta = convertDelta;
exports.default = {};
//# sourceMappingURL=convertDelta.js.map