/**
 * TODO: change design? load to app?
 */
function PubSub() {
    this.pagingSizeChanged = 'itemsPerPageChanged';
    this.pageBtnClicked = 'pageBtnClicked';
    this.addItemBtnClicked = 'addItemBtnPressed';
    this.removeItemBtnClicked = 'removeItemBtnPressed';
    this.resetItemAmountEvent = 'resetItemAmount';
    this.curPageChanged = 'curPageChanged';
    this.resetCartBtnClicked = 'resetCart';
    this.sortAscBtnClicked = 'sortAsc';
    this.sortDescBtnClicked = 'sortDesc';
    this.addItemToCartEvent = 'addItemToCart';
    this.removeItemFromCartEvent = 'removeItemFromCart';
    this.refreshPagingEvent = 'refreshPaging';
    this.refreshViewEvent = 'refreshView';

    /* {
     *     name1: cb1,
     *     ...
     *     nameN: cbN
     * }
     */
    var events = {};

    /**
     * Registers a new event.
     * @param {String} name event name
     * @param {Function} cb callback function of the event
     */
    this.subscribe = function(name, cb) {
        events[name] = cb;

    }
    /**
     * Removes event with specified name from the event bus.
     * @param {String} name event name
     */
    this.unsubscribe = function(name) {
        events[name] = undefined;
    }

    /**
     * Runs the event with specified name.
     * @param {String} name event name
     * @param {Object} data data to be passed to event handler
     */
    this.publish = function(name, data) {
        events[name](data);
    }
}
