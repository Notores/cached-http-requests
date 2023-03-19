export class RequestResult {
    response;
    success;
    request;
    constructor(success, request, response = null) {
        this.success = success;
        this.request = request;
        this.response = response ?? new Response("");
    }
    static failed(request) {
        return new RequestResult(false, request);
    }
    static result(response, request) {
        return new RequestResult(true, request, response);
    }
}
