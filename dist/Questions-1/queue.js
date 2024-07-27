"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQueue = void 0;
class MyQueue {
    constructor() {
        this.arr = [];
    }
    push(val) {
        this.arr.push(val);
    }
    pop() {
        if (this.arr.length > 0) {
            return this.arr.shift();
        }
        return undefined;
    }
    size() {
        return this.arr.length;
    }
    empty() {
        return this.arr.length === 0;
    }
}
exports.MyQueue = MyQueue;
