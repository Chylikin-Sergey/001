function MyDrag() {
    let _mouseX;
    let _mouseY;
    var _left;
    let _top;
    let _callback;
    let _isDragged = false;
    let _scalePage;
    function startDrag(initial) {
        _mouseX = initial.pageX;
        _mouseY = initial.pageY;
        _left = initial.left;
        _top = initial.top;
        _callback = initial.callback;
        _isDragged = true;
        $(document).on('mousemove', function_1);
    }
    function getIsDragged() {
        return _isDragged;
    }
    function function_1(e) {
        let delta_x = e.pageX - _mouseX;
        let delta_y = e.pageY - _mouseY;
        delta_x /= _scalePage;
        delta_y /= _scalePage;

        _left += delta_x;
        _top += delta_y;

        // let start = $('.start');
        // let butRotate = $('.my_buttonscontrol__rotate');
        // let rotWidth = butRotate.width();
        // let rotHeight = butRotate.height();
        // let l = ((start.offset().left + butRotate.offset().left) * _scalePage) + (rotWidth / 2);
        // let t = ((start.offset().top + butRotate.offset().top) * _scalePage) + (rotHeight / 2);
        // let point = $(`<div style="position:absolute;width:10px;height:10px;background:black;z-index:999;
        // transform:translate(${l}px,${t}px)"></div>`);
        // $('.window').prepend(point);

        _callback({ left: _left, top: _top });

        _mouseX = e.pageX;
        _mouseY = e.pageY;

    }

    function stopDrag() {
        $(document).off('mousemove', function_1);
        _isDragged = false;
    }

    function setScalePage(scalePage) {
        _scalePage = scalePage;
    }
    return {
        startDrag: startDrag,
        stopDrag: stopDrag,
        getIsDragged: getIsDragged,
        setScalePage: setScalePage
    };
}