export class QueableRequest {
    public uri: string;
    public method: string;
    public headers: HeadersInit;
    public content: any;

    constructor(
        uri: QueableRequest["uri"],
        method: QueableRequest["method"],
        headers: QueableRequest["headers"],
        content: QueableRequest["content"] = null
    ) {
        this.uri = uri;
        this.method = method;
        this.headers = headers;
        this.content = content;
    }
}