import { QueableRequest } from "../types/QueableRequest";
import { Storage } from "../types/Storage";

export class MemoryStorage implements Storage {
    private requestQueue: Queue<QueableRequest>;
    public supportObjects : boolean = true;

    constructor() {
        this.requestQueue = new Queue<QueableRequest>();
    }

    enqueue = async (request: QueableRequest) => {
        this.requestQueue.enqueue(request);
    }

    dequeue = async () => {
        if(!this.requestQueue.isEmpty)
            return this.requestQueue.dequeue();
        return null;
    }

    peek = async () => {
        if(!this.requestQueue.isEmpty)
            return this.requestQueue.peek();
        return null;
    }

    any = async () => {
        return !this.requestQueue.isEmpty;
    }
}

class Queue<T> {
    elements: {[key: number]: T};
    head: number;
    tail: number;

    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }

    enqueue(element: T) : void {
      this.elements[this.tail] = element;
      this.tail++;
    }

    dequeue() : T {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }

    peek(): T {
      return this.elements[this.head];
    }

    get length() {
      return this.tail - this.head;
    }

    get isEmpty() {
      return this.length === 0;
    }    
  }