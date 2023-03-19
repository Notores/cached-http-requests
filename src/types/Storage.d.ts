import {QueableRequest} from './QueableRequest';

export interface Storage {
    supportObjects: boolean;
    enqueue: (request: QueableRequest) => Promise<void>;
    dequeue: () => Promise<QueableRequest|null>;
    peek: () => Promise<QueableRequest|null>;
    any: () => Promise<boolean>;
}