export interface Queue<T> {
    arr: Array<T>,
    push: (val: T) => void,
    pop: () => void,
    size: () => number,
    empty: () => boolean
}

export class MyQueue<T> implements Queue<T> {
    public arr: T[];

    constructor() {
        this.arr = [];
    }

    push(val: T): void {
        this.arr.push(val);
    }

    pop(): T | undefined {
        if (this.arr.length > 0) {
            return this.arr.shift();
        }
        return undefined;
    }

    size(): number {
        return this.arr.length;
    }

    empty(): boolean {
        return this.arr.length === 0;
    }
}
