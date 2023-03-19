import { QueableRequest } from "../types/QueableRequest";
export declare class RequestResult {
    response: Response;
    success: boolean;
    request: QueableRequest;
    constructor(success: boolean, request: QueableRequest, response?: Response | null);
    static failed(request: QueableRequest): RequestResult;
    static result(response: Response, request: QueableRequest): RequestResult;
}
//# sourceMappingURL=RequestResult.d.ts.map