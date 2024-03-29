export default class {
    constructor() {
        this._time = 0;
    }

    start() {
        this._time = Date.now();
    }

    stop() {
        this._time = 0;
    }

    getTime() {
        return this._time === 0 ? 0 : Date.now() - this._time;
    }
}
