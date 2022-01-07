/*
                                    ---Points---

                                    ---left-top
let x11 = center_x - (distance / 2 * Math.cos(-radians + beta));
let y11 = center_y - (distance / 2 * Math.sin(-radians + beta));

                                    ---right-bottom---
let x33 = center_x + (distance / 2 * Math.cos(radians - beta));
let y33 = center_y - (distance / 2 * Math.sin(radians - beta));

                                    ---right-top---
let x22 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
let y22 = center_y + (distance / 2 * Math.sin(-radians - beta));

                                    ---left-bottom---
let x44 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
let y44 = center_y - (distance / 2 * Math.sin(-radians - beta));

let x5 = x11 + 25 * Math.cos(radians);
let y5 = y11 - 25 * Math.sin(radians);

let x6 = x44 + 25 * Math.cos(radians);
let y6 = y44 - 25 * Math.sin(radians);
 */

function MyResize() {

    let _left, _top;
    let _offsetLeft, _offsetTop;
    let _width, _height, _newWidth, _newHeight;
    let _min_width, _min_height;
    let _aspectRatio;
    let _degree;
    let _side;
    let _mouseX, _mouseY;

    let _callback;

    let _isResized = false;

    let _scalePage;

    function startResize(initial) {
        _offsetLeft = initial.offsetLeft;
        _offsetTop = initial.offsetTop;
        _left = initial.left;
        _top = initial.top;
        _degree = initial.degree;
        _width = initial.width;
        _height = initial.height;
        _newWidth = _width;
        _newHeight = _height;
        _min_width = initial.min_width;
        _min_height = initial.min_height;

        _aspectRatio = _height / _width;
        _side = initial.side;

        _callback = initial.callback;

        _mouseX = initial.pageX;
        _mouseY = initial.pageY;

        _isResized = true;

        $(document).on('mousemove', function_1);
    }
    function getIsResized() {
        return _isResized;
    }
    function stopResize() {
        $(document).off('mousemove', function_1);
        _isResized = false;
    }


    function function_1(e) {

        let delta_w = e.pageX - _mouseX;
        let delta_h = e.pageY - _mouseY;

        delta_w /= _scalePage;
        delta_h /= _scalePage;

        let offset;


        switch (_side) {
            case "top-left": {
                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x2 = center_x - (distance / 2 * Math.cos(-radians + beta));
                let y2 = center_y - (distance / 2 * Math.sin(-radians + beta));

                let x1 = center_x + (distance / 2 * Math.cos(-radians + beta));
                let y1 = center_y + (distance / 2 * Math.sin(-radians + beta));


                let gipotenuza;
                if (_degree === 45 || _degree === -135) {
                    y = y2 + delta_h;
                    gipotenuza = (y1 - y) / Math.cos(radians + beta);

                } else {
                    let aspectRatioRotate = (y2 - y1) / (x2 - x1);

                    let x = ((Math.pow(aspectRatioRotate, 2) * x1 + (x2 + delta_w))
                        + aspectRatioRotate * ((y2 + delta_h) - y1)) / (Math.pow(aspectRatioRotate, 2) + 1);

                    gipotenuza = (x1 - x) / Math.cos(-radians + beta);

                }

                _newWidth = gipotenuza * Math.cos(beta);
                _newHeight = gipotenuza * Math.sin(beta);


                if (_width > _height) {
                    if (_newHeight > _min_height) {
                        offset = getCorrection(_width, _height, _width - _newWidth, _height - _newHeight, _degree);
                        _left += _width - _newWidth;
                        _top += _height - _newHeight;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _width - (_min_width / _aspectRatio), _height - _min_height, _degree);
                        _left += _width - (_min_width / _aspectRatio);
                        _top += _height - _min_height;
                        _height = _min_height;
                        _width = _min_width / _aspectRatio;
                    }
                } else if (_height > _width) {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _width - _newWidth, _height - _newHeight, _degree);
                        _left += _width - _newWidth;
                        _top += _height - _newHeight;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _width - _min_width, _height - (_min_height * _aspectRatio), _degree);
                        _top += _height - (_min_height * _aspectRatio);
                        _left += _width - _min_width;
                        _width = _min_width;
                        _height = _min_height * _aspectRatio;
                    }
                } else {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _width - _newWidth, _height - _newHeight, _degree);
                        _left += _width - _newWidth;
                        _top += _height - _newHeight;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _width - _min_width, _height - _min_height, _degree);
                        _left += _width - _min_width;
                        _top += _height - _min_height;
                        _width = _min_width;
                        _height = _min_height;
                    }
                }

                break;
            }
            case "top-right": {

                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x2 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y2 = center_y + (distance / 2 * Math.sin(-radians - beta));

                let x1 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y1 = center_y - (distance / 2 * Math.sin(-radians - beta));

                let gipotenuza;
                if (_degree === -45 || _degree === 135) {
                    let y = y2 + delta_h;
                    gipotenuza = (y1 - y) / Math.cos(-radians + beta);
                } else {
                    let aspectRatioRotate = (y2 - y1) / (x2 - x1);

                    let x = ((Math.pow(aspectRatioRotate, 2) * x1 + (x2 + delta_w))
                        + aspectRatioRotate * ((y2 + delta_h) - y1)) / (Math.pow(aspectRatioRotate, 2) + 1);
                    gipotenuza = (x - x1) / Math.cos(radians + beta);
                }

                _newWidth = gipotenuza * Math.cos(beta);
                _newHeight = gipotenuza * Math.sin(beta);


                if (_width > _height) {
                    if (_newHeight > _min_height) {
                        offset = getCorrection(_width, _height, _newWidth - _width, _height - _newHeight, _degree);
                        _top += _height - _newHeight;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, (_min_width / _aspectRatio) - _width, _height - _min_height, _degree);
                        _top += _height - _min_height;
                        _height = _min_height;
                        _width = _min_width / _aspectRatio;
                    }
                } else if (_height > _width) {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _newWidth - _width, _height - _newHeight, _degree);
                        _top += _height - _newHeight;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _min_width - _width, _height - (_min_height * _aspectRatio), _degree);
                        _top += _height - (_min_height * _aspectRatio);
                        _width = _min_width;
                        _height = _min_height * _aspectRatio;
                    }
                } else {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _newWidth - _width, _height - _newHeight, _degree);
                        _top += _height - _newHeight;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _min_width - _width, _height - _min_height, _degree);
                        _top += _height - _min_height;
                        _width = _min_width;
                        _height = _min_height;
                    }
                }

                break;
            }
            case "bottom-left": {
                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x1 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y1 = center_y + (distance / 2 * Math.sin(-radians - beta));

                let x2 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y2 = center_y - (distance / 2 * Math.sin(-radians - beta));


                let gipotenuza;
                if (_degree === -45 || _degree === 135) {
                    let y = y2 + delta_h;
                    gipotenuza = (y - y1) / Math.cos(-radians + beta);
                } else {
                    let aspectRatioRotate = (y2 - y1) / (x2 - x1);

                    let x = ((Math.pow(aspectRatioRotate, 2) * x1 + (x2 + delta_w))
                        + aspectRatioRotate * ((y2 + delta_h) - y1)) / (Math.pow(aspectRatioRotate, 2) + 1);

                    gipotenuza = (x1 - x) / Math.cos(radians + beta);
                }


                _newWidth = gipotenuza * Math.cos(beta);
                _newHeight = gipotenuza * Math.sin(beta);

                if (_width > _height) {
                    if (_newHeight > _min_height) {
                        offset = getCorrection(_width, _height, _width - _newWidth, _newHeight - _height, _degree);
                        _left += _width - _newWidth;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _width - (_min_width / _aspectRatio), _min_height - _height, _degree);
                        _left += _width - (_min_width / _aspectRatio);
                        _height = _min_height;
                        _width = _min_width / _aspectRatio;
                    }
                } else if (_height > _width) {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _width - _newWidth, _newHeight - _height, _degree);
                        _left += _width - _newWidth;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _width - _min_width, (_min_height * _aspectRatio) - _height, _degree);
                        _left += _width - _min_width;
                        _width = _min_width;
                        _height = (_min_height * _aspectRatio);
                    }
                } else {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _width - _newWidth, _newHeight - _height, _degree);
                        _left += _width - _newWidth;
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _width - _min_width, _min_height - _height, _degree);
                        _left += _width - _min_width;
                        _width = _min_width;
                        _height = _min_height;
                    }
                }

                break;
            }
            case "bottom-right": {

                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x1 = center_x - (distance / 2 * Math.cos(-radians + beta));
                let y1 = center_y - (distance / 2 * Math.sin(-radians + beta));

                let x2 = center_x + (distance / 2 * Math.cos(-radians + beta));
                let y2 = center_y + (distance / 2 * Math.sin(-radians + beta));



                let gipotenuza;
                if (_degree === 45 || _degree === -135) {
                    let y = y2 + delta_h;
                    gipotenuza = (y - y1) / Math.cos(radians + beta);

                } else {
                    let aspectRatioRotate = (y2 - y1) / (x2 - x1);

                    let x = ((Math.pow(aspectRatioRotate, 2) * x1 + (x2 + delta_w))
                        + aspectRatioRotate * ((y2 + delta_h) - y1)) / (Math.pow(aspectRatioRotate, 2) + 1);

                    gipotenuza = (x - x1) / Math.cos(-radians + beta);

                }

                _newWidth = gipotenuza * Math.cos(beta);
                _newHeight = gipotenuza * Math.sin(beta);

                if (_width > _height) {
                    if (_newHeight > _min_height) {
                        offset = getCorrection(_width, _height, _newWidth - _width, _newHeight - _height, _degree);
                        _height += _newHeight - _height;
                        _width += _newWidth - _width;

                    } else {
                        offset = getCorrection(_width, _height, (_min_width / _aspectRatio) - _width, _min_height - _height, _degree);
                        _height = _min_height;
                        _width = (_min_width / _aspectRatio);
                    }
                } else if (_height > _width) {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _newWidth - _width, _newHeight - _height, _degree);
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _min_width - _width, (_min_height * _aspectRatio) - _height, _degree);
                        _width = _min_width;
                        _height = (_min_height * _aspectRatio);
                    }
                } else {
                    if (_newWidth > _min_width) {
                        offset = getCorrection(_width, _height, _newWidth - _width, _newHeight - _height, _degree);
                        _width += _newWidth - _width;
                        _height += _newHeight - _height;
                    } else {
                        offset = getCorrection(_width, _height, _min_width - _width, _min_height - _height, _degree);
                        _width = _min_width;
                        _height = _min_height;
                    }
                }

                break;
            }
            case "top": {

                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x11 = center_x - (distance / 2 * Math.cos(-radians + beta));
                let y11 = center_y - (distance / 2 * Math.sin(-radians + beta));

                let x33 = center_x + (distance / 2 * Math.cos(radians - beta));
                let y33 = center_y - (distance / 2 * Math.sin(radians - beta));

                let x22 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y22 = center_y + (distance / 2 * Math.sin(-radians - beta));

                let x44 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y44 = center_y - (distance / 2 * Math.sin(-radians - beta));

                let x1 = x44 + (x33 - x44) / 2;
                let y1 = y44 + (y33 - y44) / 2;

                let x2 = x11 + (x22 - x11) / 2;
                let y2 = y11 + (y22 - y11) / 2;


                let y, a;
                if (_degree === 90) {
                    a = _newHeight + delta_w;

                }
                else if (_degree === -90) {
                    a = _newHeight - delta_w;
                }
                else {

                    let aspectRatioRotate = (x2 - x1) / (y2 - y1);
                    if (!isFinite(aspectRatioRotate)) {
                        aspectRatioRotate = 0;
                    }
                    y = ((Math.pow(aspectRatioRotate, 2) * y1 + (y2 + delta_h))
                        + aspectRatioRotate * ((x2 + delta_w) - x1)) / (Math.pow(aspectRatioRotate, 2) + 1);

                    a = (y1 - y) / Math.cos(radians);
                }

                _newHeight = a;
                if (_newHeight > _min_height) {
                    offset = getCorrection(_newWidth, _newHeight, 0, _height - _newHeight, _degree);
                    _top += _height - _newHeight;
                    _height += _newHeight - _height;
                } else {
                    offset = getCorrection(_newWidth, _newHeight, 0, _height - _min_height, _degree);
                    _top += _height - _min_height;
                    _height = _min_height;
                }

                break;
            }
            case "bottom": {

                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);


                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x11 = center_x - (distance / 2 * Math.cos(-radians + beta));
                let y11 = center_y - (distance / 2 * Math.sin(-radians + beta));

                let x33 = center_x + (distance / 2 * Math.cos(radians - beta));
                let y33 = center_y - (distance / 2 * Math.sin(radians - beta));

                let x22 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y22 = center_y + (distance / 2 * Math.sin(-radians - beta));

                let x44 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y44 = center_y - (distance / 2 * Math.sin(-radians - beta));

                let x1 = x11 + (x22 - x11) / 2;
                let y1 = y11 + (y22 - y11) / 2;

                let x2 = x44 + (x33 - x44) / 2;
                let y2 = y44 + (y33 - y44) / 2;


                let y, a;
                if (_degree === 90) {
                    a = _newHeight - delta_w;

                }
                else if (_degree === -90) {
                    a = _newHeight + delta_w;
                }
                else {

                    aspectRatioRotate = (x2 - x1) / (y2 - y1);
                    if (!isFinite(aspectRatioRotate)) {
                        aspectRatioRotate = 0;
                    }
                    y = ((Math.pow(aspectRatioRotate, 2) * y1 + (y2 + delta_h))
                        + aspectRatioRotate * ((x2 + delta_w) - x1)) / (Math.pow(aspectRatioRotate, 2) + 1);

                    a = (y - y1) / Math.cos(radians);
                }

                _newHeight = a;
                if (_newHeight > _min_height) {
                    offset = getCorrection(_width, _height, 0, _newHeight - _height, _degree);
                    _height += _newHeight - _height;
                } else {
                    offset = getCorrection(_width, _height, 0, _min_height - _height, _degree);
                    _height = _min_height;
                }


                break;
            }
            case "left": {
                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x11 = center_x - (distance / 2 * Math.cos(-radians + beta));
                let y11 = center_y - (distance / 2 * Math.sin(-radians + beta));

                let x33 = center_x + (distance / 2 * Math.cos(radians - beta));
                let y33 = center_y - (distance / 2 * Math.sin(radians - beta));

                let x22 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y22 = center_y + (distance / 2 * Math.sin(-radians - beta));

                let x44 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y44 = center_y - (distance / 2 * Math.sin(-radians - beta));

                let x1 = x22 + (x33 - x22) / 2;
                let y1 = y22 + (y33 - y22) / 2;

                let x2 = x11 + (x44 - x11) / 2;
                let y2 = y11 + (y44 - y11) / 2;

                let x, a;

                if (_degree === 90) {
                    a = _newWidth - delta_h;

                }
                else if (_degree === -90) {
                    a = _newWidth + delta_h;
                }
                else {
                    let aspectRatioRotate = (y2 - y1) / (x2 - x1);
                    if (!isFinite(aspectRatioRotate)) {
                        aspectRatioRotate = 0;
                    }
                    x = ((Math.pow(aspectRatioRotate, 2) * x1 + (x2 + delta_w))
                        + aspectRatioRotate * ((y2 + delta_h) - y1)) / (Math.pow(aspectRatioRotate, 2) + 1);

                    a = (x1 - x) / Math.cos(radians);
                }

                _newWidth = a;

                if (_newWidth > _min_width) {
                    offset = getCorrection(_width, _height, _width - _newWidth, 0, _degree);
                    _left += _width - _newWidth;
                    _width += _newWidth - _width;

                } else {
                    offset = getCorrection(_width, _height, _width - _min_width, 0, _degree);
                    _left += _width - _min_width;

                    _width = _min_width;
                }


                break;
            }

            case "right": {

                let radians = _degree * Math.PI / 180;
                radians *= -1;
                let beta = Math.atan2(_newHeight, _newWidth);

                let center_x = (_offsetLeft + _left) + (_newWidth / 2);
                let center_y = (_offsetTop + _top) + (_newHeight / 2);

                let distance = Math.pow(_newWidth, 2) + Math.pow(_newHeight, 2);
                distance = Math.sqrt(distance);

                let x11 = center_x - (distance / 2 * Math.cos(-radians + beta));
                let y11 = center_y - (distance / 2 * Math.sin(-radians + beta));

                let x33 = center_x + (distance / 2 * Math.cos(radians - beta));
                let y33 = center_y - (distance / 2 * Math.sin(radians - beta));

                let x22 = center_x - (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y22 = center_y + (distance / 2 * Math.sin(-radians - beta));

                let x44 = center_x + (distance / 2 * Math.cos(radians + beta - (180 * Math.PI / 180)));
                let y44 = center_y - (distance / 2 * Math.sin(-radians - beta));



                let x1 = x11 + (x44 - x11) / 2;
                let y1 = y11 + (y44 - y11) / 2;

                let x2 = x22 + (x33 - x22) / 2;
                let y2 = y22 + (y33 - y22) / 2;

                let x, a;

                if (_degree === 90) {
                    a = _newWidth + delta_h;
                }
                else if (_degree === -90) {
                    a = _newWidth - delta_h;
                }
                else {
                    let aspectRatioRotate = (y2 - y1) / (x2 - x1);
                    if (!isFinite(aspectRatioRotate)) {
                        aspectRatioRotate = 0;
                    }
                    x = ((Math.pow(aspectRatioRotate, 2) * x1 + (x2 + delta_w))
                        + aspectRatioRotate * ((y2 + delta_h) - y1)) / (Math.pow(aspectRatioRotate, 2) + 1);
                    a = (x - x1) / Math.cos(radians);
                }

                _newWidth = a;


                if (_newWidth > _min_width) {
                    offset = getCorrection(_width, _height, _newWidth - _width, 0, _degree);
                    _width += _newWidth - _width;
                } else {
                    offset = getCorrection(_width, _height, _min_width - _width, 0, _degree);
                    _width = _min_width;
                }

                break;
            }
        }
        _left -= offset.left;
        _top += offset.top;


        let newParameters = { left: _left, top: _top, width: _width, height: _height };

        _callback(newParameters);

        _mouseX = e.pageX;
        _mouseY = e.pageY;
    }

    function getCorrection(init_w, init_h, delta_w, delta_h, angle) {
        //Convert angle from degrees to radians
        angle = angle * Math.PI / 180;

        //Get position after rotation with original size
        var x = -init_w / 2;
        var y = init_h / 2;

        var new_x = y * Math.sin(angle) + x * Math.cos(angle);
        var new_y = y * Math.cos(angle) - x * Math.sin(angle);
        var diff1 = { left: new_x - x, top: new_y - y };

        var new_width = init_w + delta_w;
        var new_height = init_h + delta_h;

        //Get position after rotation with new size
        var x = -new_width / 2;
        var y = new_height / 2;
        var new_x = y * Math.sin(angle) + x * Math.cos(angle);
        var new_y = y * Math.cos(angle) - x * Math.sin(angle);
        var diff2 = { left: new_x - x, top: new_y - y };

        //Get the difference between the two positions
        var offset = { left: (diff2.left - diff1.left), top: diff2.top - diff1.top };
        return offset;
    }

    function setScalePage(scalePage) {
        _scalePage = scalePage;
    }
    return {
        startResize: startResize,
        stopResize: stopResize,
        getIsResized: getIsResized,
        setScalePage: setScalePage
    };
}



