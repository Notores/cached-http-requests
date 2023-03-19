"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResult = void 0;
class RequestResult {
    constructor(success, request, response = null) {
        this.success = success;
        this.request = request;
        this.response = response !== null && response !== void 0 ? response : new Response("");
    }
    static failed(request) {
        return new RequestResult(false, request);
    }
    static result(response, request) {
        return new RequestResult(true, request, response);
    }
}
exports.RequestResult = RequestResult;
