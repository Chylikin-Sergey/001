class BottomPanelController {


    #myScaleSlider = new MyScaleSlider();
    #myScaleButton = new MyScaleButton();
    #myScaleMenu = new MyScaleMenu(this.#myScaleButton.button);
    #scaleController = new ScaleController(1080, 1080, 112);

    constructor() {

        this.#scaleController.register(this.#myScaleSlider);
        this.#scaleController.register(this.#myScaleButton);
        this.#scaleController.register(this.#myScaleMenu);


        this.#myScaleSlider.subscribe(data => this.#scaleController.changeScale(data));
        this.#myScaleMenu.subscribe(data => this.#scaleController.changeScale(data));
        this.#myScaleButton.subscribe('click', () => { this.#myScaleMenu.show() });

        this.#myScaleMenu.initialize();
    }

    subscribeOnChangesScalePage(participant) {
        this.#scaleController.register(participant);
    }

}


class ScaleController {

    #participants = [];
    #state = "default";
    #from;
    #canvaWidth;
    #canvaHeight;
    #freeSpaceForMargin;
    #scroll = $('.scroll');
    #scale;
    #minScale = 0.1;
    constructor(canvaWidth, canvaHeight, freeSpaceForMargin) {
        this.#canvaWidth = canvaWidth;
        this.#canvaHeight = canvaHeight;
        this.#freeSpaceForMargin = freeSpaceForMargin;
    }

    changeScale(data) {
        this.#from = data.from;

        this.#scale = data.scale;
        switch (this.#scale) {
            case "Fit": {
                this.#scale = this.#fit();

                $(window).on('resize', { fn: this.#fit }, this.#observeWindowResize);
                this.#state = "Fit";
                break;
            }
            case "Fill": {
                this.#scale = this.#fill();
                $(window).on('resize', { fn: this.#fill }, this.#observeWindowResize);
                this.#state = "Fill";
                break;
            }
            default: {
                if (isNaN(this.#scale)) {
                    this.#scale = this.#scale.split("%")[0] / 100;
                }
                if (this.#state !== "default") {
                    $(window).off('resize', this.#observeWindowResize);
                    this.#state = "default";
                }
            }
        }
        this.#broadcast(this.#scale);
    }

    register(participant) {
        this.#participants.push(participant);
        participant.setScalePage(this.#scale);
    }
    #observeWindowResize = (e) => {
        this.#broadcast(e.data.fn());
    }
    #fit = () => {
        let scale;

        let widthWithMargin = this.#scroll.width() - this.#freeSpaceForMargin;
        let heightWithMargin = this.#scroll.height() - this.#freeSpaceForMargin;


        if (widthWithMargin > heightWithMargin) {
            scale = heightWithMargin / this.#canvaHeight;
        } else {
            scale = widthWithMargin / this.#canvaWidth;
        }

        return scale < this.#minScale ? this.#minScale : scale;
    }
    #fill = () => {
        let widthWithMargin = this.#scroll.width() - this.#freeSpaceForMargin;
        let scale = widthWithMargin / this.#canvaWidth;
        return scale < this.#minScale ? this.#minScale : scale;
    }

    #broadcast(scale) {

        for (let index in this.#participants) {
            if (this.#participants[index] !== this.#from) {
                this.#participants[index].setScalePage(scale);
            }
        }
    }
}