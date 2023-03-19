import { QueableRequest } from "../types/QueableRequest";

export class RequestResult {
    response: Response;
    success: boolean;
    request: QueableRequest;
    
    constructor(success: boolean, request: QueableRequest, response: Response|null = null) {
        this.success = success;
        this.request = request;
        this.response = response ?? new Response("");
    }

    public static failed(request: QueableRequest) {
        return new RequestResult(false, request);
    }

    public static result(response: Response, request: QueableRequest) {
        return new RequestResult(true, request, response);
    }
}