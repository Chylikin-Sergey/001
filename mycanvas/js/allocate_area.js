function MyAllocateArea() {

    let allocation_area = null;

    function createArea() {
        return allocation_area = $(`<div class='my_allocation-area'></div>`);
    }
    function removeArea() {
        if (allocation_area !== null) {
            allocation_area.remove();
            allocation_area = null;
        }
    }
    function updateArea() {
        allocation_area.css('transform', `translate(${0}px,${0}px)`);
    }

    return {
        createArea: createArea,
        removeArea: removeArea,
        updateArea: updateArea
    };
}