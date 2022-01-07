//function will control view MyCanvas: for example append or prepend element, change text color and other things related with view
function MyView() {
    function append(place, element) {
        $(`${place}`).append(element);
    }
    function prepend(place, element) {
        $(`${place}`).prepend(element);
    }
    return {
        append: append,
        prepend: prepend
    }
}