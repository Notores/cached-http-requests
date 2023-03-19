import { QueableRequest } from "../types/QueableRequest";
import { RequestResult } from "./RequestResult";
import { Storage } from "../types/Storage";

export class RequestManager {
    storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
        this.doRequest.bind(this);
    }

    public async doRequest(
        queueOnFailure: boolean,
        uri: QueableRequest["uri"], 
        method: QueableRequest["method"], 
        headers: QueableRequest["headers"],
        content: QueableRequest["content"] = null
    ) : Promise<RequestResult> {
        const result = await this.doRequestInternal(uri, method, headers, content);
        if(queueOnFailure && !result.success) {
            this.storage.enqueue(result.request);
        }
        return result;
    }

    public async tryDequeue(): Promise<number> {
        let dequeued = 0;
        while(await this.storage.any()) {
            const req = await this.storage.peek();
            if(!req)
                break;
            const result = await this.doRequestInternal(req.uri, req.method, req.headers, req.content);
            if(!result.success)
                break;
            await this.storage.dequeue();
            dequeued++;
        }
        return dequeued;
    }

    private doRequestInternal = (
        uri: QueableRequest["uri"], 
        method: QueableRequest["method"], 
        headers: QueableRequest["headers"],
        content: QueableRequest["content"] = null,
    ) : Promise<RequestResult> => {
        const queueAbleRequest = new QueableRequest(uri, method, headers, content);
        return new Promise((resolve, reject) => {
            this.isServiceAvailable(queueAbleRequest).then(avail => {
                if(avail) {
                    const controller = new AbortController()
                    const timeoutId = setTimeout(() => controller.abort(), 5000)
                    const requestInfo: RequestInit = {
                        signal: controller.signal,
                        method: 'OPTIONS',
                        headers: queueAbleRequest.headers,
                    };
                    if(queueAbleRequest.content)
                        requestInfo.body = (typeof queueAbleRequest.content) != "string" ? JSON.stringify(queueAbleRequest.content) : queueAbleRequest.content;
                    
                    fetch(queueAbleRequest.uri, requestInfo).then(request => {
                        clearTimeout(timeoutId);
                        resolve(RequestResult.result(request, queueAbleRequest));
                    }).catch(err => resolve(RequestResult.failed(queueAbleRequest)));
                } else {
                    resolve(RequestResult.failed(queueAbleRequest));
                }
            })
        });
    }

    private isServiceAvailable = async (requestInfo: QueableRequest) : Promise<boolean> => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        try {
            const request = await fetch(requestInfo.uri, {
                signal: controller.signal,
                method: 'OPTIONS',
                headers: requestInfo.headers
            })
            clearTimeout(timeoutId);
            return !!request;
        } catch {}
        return false;
    }
}