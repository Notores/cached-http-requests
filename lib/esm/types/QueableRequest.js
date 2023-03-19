export class QueableRequest {
    uri;
    method;
    headers;
    content;
    constructor(uri, method, headers, content = null) {
        this.uri = uri;
        this.method = method;
        this.headers = headers;
        this.content = content;
    }
}
