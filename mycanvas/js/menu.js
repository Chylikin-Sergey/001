$(document).ready(function () {

    let myCanvas = new MyCanvas();
    let bottomPanelController = new BottomPanelController();
    bottomPanelController.subscribeOnChangesScalePage(myCanvas);
    


    let button = $('.MyScaleButton');
    let offset = button.offset();
    $('.percent-menu').css('transform', `translate3d(${offset.left - button.width()}px,${offset.top - $('.percent-menu').height()}px,${0}px)`);

    $(window).on('resize', function () {
        let offset = button.offset();

        let left = offset.left - button.width();
        let top = offset.top - $('.percent-menu').height();
        if (top <= 0) {
            top = -5;
        }
        $('.percent-menu').css('transform', `translate3d(${left}px,${top}px,${0}px)`);

    })
    $('.add_image').on('click', function () {
        myCanvas.addImage();
    })
    $('.add_text').on('click', function () {
        myCanvas.addText();
    })

})