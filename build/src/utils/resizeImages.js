"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require('sharp');
const transformImg = function (buffer, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const generateName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
        yield sharp(buffer)
            .resize(550, 325)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`${__dirname}${path}${generateName}`);
        return generateName;
    });
};
exports.default = {
    transformImg,
};
//# sourceMappingURL=resizeImages.js.map