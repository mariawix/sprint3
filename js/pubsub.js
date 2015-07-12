/**
 * Loads event manager to the app.
 */
(function PubSub(app) {
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
    function subscribe(name, cb) {
        events[name] = cb;
    }

    /**
     * Removes event with specified name from the event bus.
     * @param {String} name event name
     */
    function unsubscribe(name) {
        events[name] = undefined;
    }

    /**
     * Runs the event with specified name.
     * @param {String} name event name
     * @param {Object} data data to be passed to event handler
     */
    function publish(name, data) {
        events[name](data);
    }

    app.eventBus = {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        publish: publish,

        eventNames: {
            // Pagination
            pagingSizeChanged: 'pagingSizeChanged',
            pageBtnClicked: 'pageBtnClicked',
            curPageChanged: 'curPageChanged',
            // Cart Buttons
            resetItemAmount: 'resetItemAmount',
            setItemAmountInCart: 'setItemCartAmount',
            addItemToCart: 'addItemToCart',
            removeItemFromCart: 'removeItemFromCart',
            // Catalogue
            sortAscBtnClicked: 'sortAscBtnClicked',
            sortDescBtnClicked: 'sortDescBtnClicked',


            reloadPagination: 'reloadPagination',
            reloadItems: 'reloadItems'
        }
    };
}(app));
