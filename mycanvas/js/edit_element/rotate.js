function MyRotate() {

    let _left;
    let _top;
    let _width;
    let _height;
    let _callback;
    let _isRotated = false;

    function startRotate(initial) {
        _left = initial.left;
        _top = initial.top;
        _width = initial.width;
        _height = initial.height;
        _callback = initial.callback;
        _isRotated = true;
        $(document).on('mousemove', function_1);
    }
    function getIsRotated() {
        return _isRotated;
    }
    function stopRotate() {
        $(document).off('mousemove', function_1);
        _isRotated = false;
    }

    function function_1(e) {

        let center_x = (_left) + (_width / 2);
        let center_y = (_top) + (_height / 2);
        let mouse_x = e.pageX;
        let mouse_y = e.pageY;

        let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        let degree = (radians * (180 / Math.PI) * -1);


        _callback(degree);
    }

    return {
        startRotate: startRotate,
        stopRotate: stopRotate,
        getIsRotated: getIsRotated,
    };
}