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
exports.MemoryStorage = void 0;
class MemoryStorage {
    constructor() {
        this.supportObjects = true;
        this.enqueue = (request) => __awaiter(this, void 0, void 0, function* () {
            this.requestQueue.enqueue(request);
        });
        this.dequeue = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.requestQueue.isEmpty)
                return this.requestQueue.dequeue();
            return null;
        });
        this.peek = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.requestQueue.isEmpty)
                return this.requestQueue.peek();
            return null;
        });
        this.any = () => __awaiter(this, void 0, void 0, function* () {
            return !this.requestQueue.isEmpty;
        });
        this.requestQueue = new Queue();
    }
}
exports.MemoryStorage = MemoryStorage;
class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}
