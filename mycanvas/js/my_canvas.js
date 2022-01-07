
function MyElement() {
    let id = null;
    let left;
    let top;
    let width;
    let height;
    let degree = 0;//-135

    return { id, left, top, width, height, degree };
}



function MyCanvas() {
    let _scalePage = 1;

    let ar_elements = new Array();
    let _border = Border(_scalePage);
    let _buttonsControl = ButtonsControl();
    let _drag = MyDrag();
    let _rotate = MyRotate();
    let _resize = MyResize();
    let _view = MyView();
    let _allocationArea = MyAllocateArea();
    let _hoveredElement = null;
    let _currentElement = null;


    let callbacks = {
        mycanvas_mousedown: mycanvas_mousedown,
        element_mouseenter: element_mouseenter,
        element_mouseleave: element_mouseleave,
        document_mousemove: document_mousemove,
        document_mouseup: document_mouseup
    };
    Events(callbacks);

    let isHoveredElementOn = true;


    this.addText = function () {
        let newDiv = $(`<div class="element editable" style="pointer-events:auto; width: 200px; height: 200px;transform: 
        translate(${1}px, ${1}px) rotate(0deg)"></div>`);

        let div1 = $(`<div style="transform-origin:0px 0px;writing-mode:horizontal-tb;"></div>`);
        let div2 = $(`<div style="position:relative;"></div>`);
        let div3 = $(`<div></div>`);
        let div4 = $(`<div style="position:relative;color:#000;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0;
        line-height:1.4;direction:ltr; text-align:left; text-transform:none;tab-size:4;word-break:normal;overflow:visible;overflow-wrap:break-word;height:auto; white-space:normal;"></div>`);
        let p = $(`<p style="letter-spacing:0em"></p>`);
        let span = $(`<span>Add heading</span>`);

        p.append(span);
        div4.append(p);
        div3.append(div4);
        div2.append(div3);
        div1.append(div2);
        newDiv.append(div1);

        $('.start').append(newDiv);
        addNewElement(newDiv);

        _currentElement = ar_elements[ar_elements.length - 1];
        let border = _border.createBorder(_currentElement);
        _border.updateBorder();
        $('.resize').prepend(border);
        let buttonsControl = _buttonsControl.createButtons(_currentElement);
        _buttonsControl.updateButtons();
        $('.resize').append(buttonsControl);
    }
    function mycanvas_mousedown(target, options) {
        let _target;

        if (_target = target.closest('.element')) {
            if (_hoveredElement !== null) {
                if (_hoveredElement !== _currentElement) {
                    if (_currentElement !== null) {
                        _border.removeBorder(_currentElement);
                        _buttonsControl.removeButtons();
                    }
                    _currentElement = _hoveredElement;
                    _hoveredElement = null;
                    let buttonsControl = _buttonsControl.createButtons(_currentElement);
                    _buttonsControl.updateButtons();

                    _view.append('.resize', buttonsControl);
                }
            }
            isHoveredElementOn = false;
            let initial = {
                pageX: options.pageX,
                pageY: options.pageY,
                left: _currentElement.left,
                top: _currentElement.top,
                callback: callbackDrag
            }
            _drag.startDrag(initial);
        } else if (_target = target.closest('.my_buttonscontrol__control')) {
            let side = $(_target).attr('class').split(" ")[0];

            let initial = {
                offsetLeft: $('.start').offset().left,
                offsetTop: $('.start').offset().top,
                left: _currentElement.left,
                top: _currentElement.top,
                width: _currentElement.width,
                height: _currentElement.height,
                min_width: 25,
                min_height: 25,
                degree: _currentElement.degree,
                side: side,
                pageX: options.pageX,
                pageY: options.pageY,
                callback: callbackResize
            }
            _resize.startResize(initial);
        } else if (_target = target.closest('.my_buttonscontrol__rotate')) {
            let initial = {
                left: $('.start').offset().left + (_currentElement.left * _scalePage),
                top: $('.start').offset().top + (_currentElement.top * _scalePage),
                width: _currentElement.width * _scalePage,
                height: _currentElement.height * _scalePage,
                callback: callbackRotate
            }
            _rotate.startRotate(initial);
        } else {
            if (_currentElement !== null) {
                _border.removeBorder(_currentElement);
                _buttonsControl.removeButtons(_currentElement);
                _currentElement = null;
            }
        }
    }


    function element_mouseenter(e) {
        if (isHoveredElementOn) {
            let element = ar_elements.find(el => el.id === e);
            if (element !== _currentElement) {
                _hoveredElement = element;
                let border = _border.createBorder(_hoveredElement);
                _view.prepend('.resize', border);
                _border.updateBorder();
            }
        }
    }
    function element_mouseleave() {
        if (isHoveredElementOn) {
            _border.removeBorder(_hoveredElement);
            _hoveredElement = null;
        }
    }

    function document_mousemove() {

    }
    function document_mouseup() {
        if (!isHoveredElementOn) {
            isHoveredElementOn = true;
        }
        if (_drag.getIsDragged()) {
            _drag.stopDrag();
        }
        if (_rotate.getIsRotated()) {
            _rotate.stopRotate();
        }
        if (_resize.getIsResized()) {
            _resize.stopResize();
        }
    }
    function callbackResize(newParameters) {
        $(_currentElement.id).css('transform', `translate(${newParameters.left}px,${newParameters.top}px) rotate(${_currentElement.degree}deg)`);
        $(_currentElement.id).width(newParameters.width).height(newParameters.height);
        _currentElement.left = newParameters.left;
        _currentElement.top = newParameters.top;
        _currentElement.width = newParameters.width;
        _currentElement.height = newParameters.height;
        _border.updateBorder();
        _buttonsControl.updateButtons();
    }
    function callbackDrag(newParameters) {
        $(_currentElement.id).css('transform', `translate(${newParameters.left}px,${newParameters.top}px) rotate(${_currentElement.degree}deg)`);
        _currentElement.left = newParameters.left;
        _currentElement.top = newParameters.top;
        _border.updateBorder();
        _buttonsControl.updateButtons();
    }

    function callbackRotate(degree) {
        $(_currentElement.id).css('transform', `translate(${_currentElement.left}px,${_currentElement.top}px) rotate(${degree}deg)`);
        _currentElement.degree = degree;
        _border.updateBorder();
        _buttonsControl.updateButtons();
    }


    this.addImage = function () {

        for (let index = 0; index < 1; index++) {
            let newDiv = $(`<div class="element editable" style="pointer-events:auto; width: 200px; height: 200px;transform: 
            translate(${1}px, ${1}px) rotate(0deg)"><img src="images/1.jpg"/></div>`);
            $('.start').append(newDiv);
            addNewElement(newDiv);
        }
        _currentElement = ar_elements[ar_elements.length - 1];
        let border = _border.createBorder(_currentElement);
        _border.updateBorder();
        $('.resize').prepend(border);
        let buttonsControl = _buttonsControl.createButtons(_currentElement);
        _buttonsControl.updateButtons();
        $('.resize').append(buttonsControl);

    }
    function removeImage() {
        alert("removeImage");
    }

    function createNewElement() {

        let div = document.createElement('div');
        div.classList.add('element');
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.background = "red";
        return div;
    }
    function addNewElement(element) {
        // element = $(element);
        let myElement = new MyElement();
        myElement.id = element[0];
        myElement.left = element.position().left / _scalePage;
        myElement.top = element.position().top / _scalePage;
        myElement.width = element.width();
        myElement.height = element.height();

        ar_elements.push(myElement);
        return ar_elements[ar_elements.length - 1];
    }

    this.setScalePage = function (scalePage) {
        _scalePage = scalePage;

        $('.MyCanvas-scalezone').css('transform', `scale(${_scalePage})`);
        $('.MyCanvas-wrap_scalezone').width($('.MyCanvas-scalezone').width() * (_scalePage)).height($('.MyCanvas-scalezone').height() * (_scalePage));
        $('.MyCanvas-manipulation').width($('.MyCanvas-scalezone').width() * (_scalePage)).height($('.MyCanvas-scalezone').height() * (_scalePage));
        _border.setScalePage(_scalePage);
        _buttonsControl.setScalePage(_scalePage);
        _drag.setScalePage(_scalePage);
        _resize.setScalePage(_scalePage);

        if (_currentElement) {
            _border.updateBorder(_currentElement);
            _buttonsControl.updateButtons(_currentElement);
        }
    }

}

