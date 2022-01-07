function Border() {

    let ar_border = new Map();
    let _scalePage;
    function createBorder(element) {
        let border = $(`<div class ='my_solidborder'><div></div></div>`);
        ar_border.set(element, border);
        return border;
    }
    function removeBorder(element) {
        if (ar_border.has(element)) {
            ar_border.get(element).remove();
            ar_border.delete(element);
        }
    }
    function updateBorder() {
        for (let iterator of ar_border) {

            let element = iterator[0];
            let border = iterator[1];

            $(border).css('transform', `translate(${element.left * _scalePage}px,${element.top * _scalePage}px) rotate(${element.degree}deg)`).width(element.width * _scalePage).height(element.height * _scalePage);
        }
    }
    function setScalePage(scalePage) {
        _scalePage = scalePage;
        // console.log(_scalePage);
    }
    return {
        createBorder: createBorder,
        removeBorder: removeBorder,
        updateBorder: updateBorder,
        setScalePage: setScalePage
    };
}
