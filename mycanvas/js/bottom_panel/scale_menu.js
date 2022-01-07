class MyScaleMenu {

    #myScaleMenu = null;
    #targetButton;
    #currentScalePage;
    #observer = new EventObserver();

    constructor(targetButton) {
        this.#targetButton = targetButton;
    }

    initialize() {
        this.#currentScalePage = "Fit";
        this.#broadcast();
    }
    show() {

        if (this.#myScaleMenu !== null) {
            return this.#hide();
        }

        this.#create();
        this.#updatePosition();

        $(window)
            .on('resize', this.#updatePosition)
            .on('mousedown', this.#isClickOnSelf);

        $('.MyScaleMenu_button').on('click', this.#selectScale);
    }
    setScalePage(value) {
        this.#currentScalePage = (value * 100) + "%";
    }
    subscribe(whatDo) {
        this.#observer.subscribe(value => whatDo(value));
    }
    #selectScale = (e) => {
        this.#currentScalePage = $(e.target).text().trim();
        this.#checkForAddIcon();
        this.#broadcast();
        this.#hide();
    }
    #broadcast = () => {
        let data = { scale: this.#currentScalePage, from: this };
        this.#observer.broadcast(data);
    }
    #hide() {
        $(window)
            .off('resize', this.#updatePosition)
            .off('mousedown', this.#isClickOnSelf);
        $('body').children(':first').remove();
        this.#myScaleMenu = null;
    }

    #create() {
        let myScaleMenuWrap = $(`
        <div style="z-index: 1; position: relative;">
            <div style="z-index: 0; position: relative;">
                <div class="MyScaleMenu"
                style="transition:opacity 150ms ease-in-out 0s; opacity: 1; position: absolute; will-change:transform; top: 0px; left:0px; ">
                <div
                    style="background-color:#ffff; box-shadow: 0 0 0 1px rgb(64 87 109 / 7%), 0 2px 12px rgb(53 71 90 / 20%);margin-bottom: 12px;border-radius: 4px; margin:8px 0; ">
                    <div style="height:100%">
                        <ul
                            style="padding: 8px 0; overflow-wrap: normal; list-style: none; width: 100%; font-size: 1.4rem;line-height: 1.6;">
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">300%</span>
                                            <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">200%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">125%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">100%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">75%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">50%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">25%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">10%</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <div style="margin: 7px 0;">
                                <hr
                                style=" border:none; border-bottom: 1px solid rgba(64,87,109,.07); height:1px; ">
                                </div>
        
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">Fit</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                                <button class="MyScaleMenu_button">
                                    <div
                                        style="align-items: center; display: flex; height: 100%; line-height: 1.6;min-width: 0;">
                                        <span class="MyScaleMenu_button__text"
                                            style="flex:1;margin:0 8px; max-width:100%; text-align:left; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;transition:color .1s ease-in-out">Fill</span>
                                        <span class="isSelectedIcon"
                                            style="min-width: 24px; justify-content: flex-end; margin-left: 0; margin-right:4px; display: inline-flex; flex: 0; text-align: center; white-space: nowrap; "></span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
         </div>
        `);
        $('body').prepend(myScaleMenuWrap);
        this.#myScaleMenu = $('.MyScaleMenu');
        this.#checkForAddIcon();
    }

    #checkForAddIcon() {
        let buttons_text = this.#myScaleMenu.find('.MyScaleMenu_button__text');
        let currentScalePage = this.#currentScalePage;
        let button = buttons_text.filter(function () { return ($(this).text() === currentScalePage) });
        if (button) {
            $('.isSelectedIcon').empty();
            button.next().append(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M4.53 11.9 9 16.38 19.44 5.97a.75.75 0 0 1 1.06 1.06L9.53 17.97c-.3.29-.77.29-1.06 0l-5-5c-.7-.71.35-1.77 1.06-1.07z">
                </path>
            </svg>
            `);
        }
    }

    #isClickOnSelf = () => {
        if (this.#myScaleMenu !== null) {
            if (!this.#myScaleMenu.is(':hover') && !this.#targetButton.is(':hover')) {
                this.#hide();
            }
        }
    }
    #updatePosition = () => {
        let left = this.#targetButton.offset().left - this.#targetButton.width();
        let top = this.#targetButton.offset().top - this.#myScaleMenu.height();
        if (top < 0) {
            top = -5;
        }
        this.#myScaleMenu.css('transform', `translate3d(${left}px,${top}px,${0}px)`);
    }
}