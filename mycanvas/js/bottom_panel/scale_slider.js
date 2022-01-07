class MyScaleSlider {

    #slider = $('#MyScaleSlider');
    #eventObserver = new EventObserver();

    constructor() {

        this.#slider.on('input', this.#changeValue);
    }
    setScalePage = function (scale) {
        this.#slider.val(scale);
    }

    subscribe = function (fn) {
        this.#eventObserver.subscribe(value => fn(value));
    }

    #changeValue = () => {
        let data = { scale: this.#slider.val(), from: this };
        this.#eventObserver.broadcast(data);
    }

}