var quantityButtons = (function() {

    var quantityBtnsContainerClass = 'item-amount',
        itemAmountInputClass = 'amount',
        addToCartBtnClass = 'add',
        removeFromCartBtnClass = 'remove',

        eventBus;

    function setEventManager(eventManager) {
        eventBus = eventManager;
    }
    /**
     * Creates add to cart button
     * @param {Object} data data object passed to event handlers: item and its amount
     * @returns {Element} add to cart button
     */
    function createAddBtn(data) {
        var btn, btnAtts = {'className': addToCartBtnClass, 'innerText': 'Add'};
        btn = helpers.createCustomElement('button', btnAtts);
        btn.onclick = function() {
            var amountAdded = parseInt(data.itemAmountElement.value, 10);
            if (!isNaN(amountAdded) && amountAdded < data.item.quantity) {
                data.itemAmountElement.value = amountAdded + 1;
                eventBus.publish(eventBus.eventNames.addItemToCart, data);
            }
        };
        return btn;
    }

    /*
     * Creates remove from cart button
     * @param {Object} data data object passed to event handlers: item and its amount
     * @returns {Element} remove cart button
     */
    function createRemoveBtn(data) {
        var btn, btnAtts = {'className': removeFromCartBtnClass, 'innerText': 'Remove'};
        btn = helpers.createCustomElement('button', btnAtts);
        btn.onclick = function() {
            var itemAmount = parseInt(data.itemAmountElement.value, 10);
            if (!isNaN(itemAmount) && itemAmount > 0) {
                data.itemAmountElement.value = itemAmount - 1;
                eventBus.publish(eventBus.eventNames.removeItemFromCart, data);
            }
        };
        return btn;
    }

    /**
     * Creates item amount input field and subscribes all its event handlers to the event bus.
     * @param {Object} item item object corresponding to created buttons
     */
    function createItemAmountElement(item) {
        var atts = {'className': itemAmountInputClass, 'value': 0},
            itemAmountElement;
        if (item.quantity === 0) {
            atts['disabled'] = 'true';
        }
        itemAmountElement = helpers.createCustomElement('input', atts);
        eventBus.subscribe(eventBus.eventNames.resetItemAmount + item.id, function() {
            itemAmountElement.value = 0;
        });
        itemAmountElement.onchange = function() {
            var itemAmount = parseInt(itemAmountElement.value, 10);
            if (isNaN(itemAmount) || itemAmount < 0 || itemAmount > item.quantity) {
                itemAmount = 0;
            }
            itemAmountElement.value = itemAmount;
            eventBus.publish(eventBus.eventNames.setItemAmountInCart, {'item': item, 'amount': itemAmount});
        };
        return itemAmountElement;
    }

    /**
     * Appends quantity buttons to the specified element.
     * @param {Element} parentElement a reference to a parent element to append buttons to
     * @param {Object} item item object corresponding to created buttons
     */
    function appendQuantityBtns(parentElement, item) {
        var itemAmountElement, container, data;
        container = helpers.appendChild(parentElement, 'span', {'className': quantityBtnsContainerClass});
        itemAmountElement = createItemAmountElement(item);
        container.appendChild(itemAmountElement);
        data = {"itemAmountElement": itemAmountElement, 'item': item};
        container.appendChild(createAddBtn(data));
        container.appendChild(createRemoveBtn(data));
    }

    return {
        appendQuantityBtns: appendQuantityBtns,
        setEventManager: setEventManager
    };
}());