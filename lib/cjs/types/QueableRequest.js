"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueableRequest = void 0;
class QueableRequest {
    constructor(uri, method, headers, content = null) {
        this.uri = uri;
        this.method = method;
        this.headers = headers;
        this.content = content;
    }
}
exports.QueableRequest = QueableRequest;
