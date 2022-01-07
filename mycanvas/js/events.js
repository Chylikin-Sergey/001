function Events(callbacks) {
    $('.mycanvas')
        .on('mousedown', function (e) {
            e.preventDefault();
            callbacks.mycanvas_mousedown(e.target, e);
        })
        .on('mouseenter', '.element', function (e) {
            callbacks.element_mouseenter(e.target);
        })
        .on('mouseleave', '.element', function (e) {
            callbacks.element_mouseleave(e.target);
        });
    $(document)
        .on('mousemove', function () {
            callbacks.document_mousemove();
        })
        .on('mouseup', function () {
            callbacks.document_mouseup();
        });
}
