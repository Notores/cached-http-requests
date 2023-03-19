export class MemoryStorage {
    requestQueue;
    supportObjects = true;
    constructor() {
        this.requestQueue = new Queue();
    }
    enqueue = async (request) => {
        this.requestQueue.enqueue(request);
    };
    dequeue = async () => {
        if (!this.requestQueue.isEmpty)
            return this.requestQueue.dequeue();
        return null;
    };
    peek = async () => {
        if (!this.requestQueue.isEmpty)
            return this.requestQueue.peek();
        return null;
    };
    any = async () => {
        return !this.requestQueue.isEmpty;
    };
}
class Queue {
    elements;
    head;
    tail;
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
