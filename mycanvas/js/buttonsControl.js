function ButtonsControl() {

    let _buttonsControl = null;
    let _element;
    let _scalePage;
    function createButtons(element) {
        _element = element;
        return _buttonsControl = $(`<div class="my_buttonscontrol"><div class="my_buttonscontrol__content"><div class="my_buttonscontrol__rotate"><div></div></div><div class="top my_buttonscontrol__control"><div></div></div><div class="bottom my_buttonscontrol__control"><div></div></div><div class="right my_buttonscontrol__control"><div></div></div><div class="left my_buttonscontrol__control"><div></div></div><div class="top-left my_buttonscontrol__control"><div></div></div><div class="top-right my_buttonscontrol__control"><div></div></div><div class="bottom-left my_buttonscontrol__control"><div></div></div><div class="bottom-right my_buttonscontrol__control"><div></div></div></div></div>`);
    }
    function removeButtons() {
        if (_buttonsControl !== null) {
            _buttonsControl.remove();
            _buttonsControl = null;
        }

    }
    function updateButtons() {
        $(_buttonsControl).css('transform', `translate(${_element.left * _scalePage}px,${_element.top * _scalePage}px) rotate(${_element.degree}deg)`).width(_element.width * _scalePage).height(_element.height * _scalePage);
    }

    function setScalePage(scalePage) {
        _scalePage = scalePage;
    }
    return {
        createButtons: createButtons,
        removeButtons: removeButtons,
        updateButtons: updateButtons,
        setScalePage: setScalePage
    };
}