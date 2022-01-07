class MyEventObserver {
    #observers = {};
    constructor() {

    }

    subscribe(eventName, fn) {
        if (!this.#observers[eventName]) {
            this.#observers[eventName] = new Array();
        }
        this.#observers[eventName].push(fn);
    }

    unsubscribe(eventName, fn) {
        if (this.#observers[eventName]) {
            this.#observers = this.#observers[eventName].filter(subscriber => subscriber !== fn);
        }
    }

    broadcast(eventName, data) {
        if (this.#observers[eventName]) {
            this.#observers[eventName].forEach(subscriber => subscriber(data));
        }
    }
}