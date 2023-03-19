"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManager = void 0;
const QueableRequest_1 = require("../types/QueableRequest");
const RequestResult_1 = require("./RequestResult");
class RequestManager {
    constructor(storage) {
        this.doRequestInternal = (uri, method, headers, content = null) => {
            const queueAbleRequest = new QueableRequest_1.QueableRequest(uri, method, headers, content);
            return new Promise((resolve, reject) => {
                this.isServiceAvailable(queueAbleRequest).then(avail => {
                    if (avail) {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 5000);
                        const requestInfo = {
                            signal: controller.signal,
                            method: 'OPTIONS',
                            headers: queueAbleRequest.headers,
                        };
                        if (queueAbleRequest.content)
                            requestInfo.body = (typeof queueAbleRequest.content) != "string" ? JSON.stringify(queueAbleRequest.content) : queueAbleRequest.content;
                        fetch(queueAbleRequest.uri, requestInfo).then(request => {
                            clearTimeout(timeoutId);
                            resolve(RequestResult_1.RequestResult.result(request, queueAbleRequest));
                        }).catch(err => resolve(RequestResult_1.RequestResult.failed(queueAbleRequest)));
                    }
                    else {
                        resolve(RequestResult_1.RequestResult.failed(queueAbleRequest));
                    }
                });
            });
        };
        this.isServiceAvailable = (requestInfo) => __awaiter(this, void 0, void 0, function* () {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            try {
                const request = yield fetch(requestInfo.uri, {
                    signal: controller.signal,
                    method: 'OPTIONS',
                    headers: requestInfo.headers
                });
                clearTimeout(timeoutId);
                return !!request;
            }
            catch (_a) { }
            return false;
        });
        this.storage = storage;
        this.doRequest.bind(this);
    }
    doRequest(queueOnFailure, uri, method, headers, content = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.doRequestInternal(uri, method, headers, content);
            if (queueOnFailure && !result.success) {
                this.storage.enqueue(result.request);
            }
            return result;
        });
    }
    tryDequeue() {
        return __awaiter(this, void 0, void 0, function* () {
            let dequeued = 0;
            while (yield this.storage.any()) {
                const req = yield this.storage.peek();
                if (!req)
                    break;
                const result = yield this.doRequestInternal(req.uri, req.method, req.headers, req.content);
                if (!result.success)
                    break;
                yield this.storage.dequeue();
                dequeued++;
            }
            return dequeued;
        });
    }
}
exports.RequestManager = RequestManager;
