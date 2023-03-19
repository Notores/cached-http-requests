import { QueableRequest } from "../types/QueableRequest";
import { Storage } from "../types/Storage";
export declare class MemoryStorage implements Storage {
    private requestQueue;
    supportObjects: boolean;
    constructor();
    enqueue: (request: QueableRequest) => Promise<void>;
    dequeue: () => Promise<QueableRequest | null>;
    peek: () => Promise<QueableRequest | null>;
    any: () => Promise<boolean>;
}
//# sourceMappingURL=MemoryStorage.d.ts.map