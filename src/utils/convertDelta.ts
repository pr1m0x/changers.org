var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

export const convertDelta = (jsonDelta: string) => {
    const obj = JSON.parse(jsonDelta);
    var converter = new QuillDeltaToHtmlConverter(obj, {});
    return converter.convert();
};

export default {};
