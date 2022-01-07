class MyScaleButton extends IBaseButton {

    constructor() {
        super('.MyScaleButton');
        this.button_text = this.button.find('.MyScaleButton-text');
    }
    clickEvent() {
        this.eventObserver.broadcast('click', this.button);
    }
    setScalePage(scale) {
        this.button_text.text(Math.round(scale * 100) + "%");
    }
}