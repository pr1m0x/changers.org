"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
function default_1(imgPropertyName) {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    return upload.single(imgPropertyName);
}
exports.default = default_1;
//# sourceMappingURL=multerProcessing.js.map