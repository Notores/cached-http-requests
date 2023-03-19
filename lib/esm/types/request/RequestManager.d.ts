import { QueableRequest } from "../types/QueableRequest";
import { RequestResult } from "./RequestResult";
import { Storage } from "../types/Storage";
export declare class RequestManager {
    storage: Storage;
    constructor(storage: Storage);
    doRequest(queueOnFailure: boolean, uri: QueableRequest["uri"], method: QueableRequest["method"], headers: QueableRequest["headers"], content?: QueableRequest["content"]): Promise<RequestResult>;
    tryDequeue(): Promise<number>;
    private doRequestInternal;
    private isServiceAvailable;
}
//# sourceMappingURL=RequestManager.d.ts.map