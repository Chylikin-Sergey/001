class IBaseButton {

    constructor(button) {
        this.button = $(button);
        this.eventObserver = new MyEventObserver();
        this.clickEvent = this.clickEvent.bind(this);
        this.button.on('click', this.clickEvent);
    }
    clickEvent() {
        this.eventObserver.broadcast('click');
    }
    subscribe(eventName, fn) {
        this.eventObserver.subscribe(eventName, fn);
    }
    unsubscribe(eventName, fn) {
        this.eventObserver.unsubscribe(eventName, fn);
    }
}