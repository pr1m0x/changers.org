export default class Department extends Error {
    status: number;
    message: string;
    indicator: string;
    constructed: boolean;

    constructor(status: number, message: string, indicator: string) {
        super();
        this.status = status;
        this.message = message;
        this.indicator = indicator || '';
        this.constructed = true;
    }
}
