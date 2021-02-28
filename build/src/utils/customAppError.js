"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Department extends Error {
    constructor(status, message, indicator) {
        super();
        this.status = status;
        this.message = message;
        this.indicator = indicator || '';
        this.constructed = true;
    }
}
exports.default = Department;
//# sourceMappingURL=customAppError.js.map