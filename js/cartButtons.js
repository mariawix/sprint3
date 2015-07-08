/**
 * Created by mariao on 7/7/15.
 */
// TODO: change design? init in main/catalog/cart?
function cartButtons() {

    var cartBtnsContainerClass = 'item-amount',
        itemAmountInputClass = 'amount',
        addToCartBtnClass = 'add',
        removeFromCartBtnClass = 'remove';

    /**
     * Creates add to cart button
     * @param {Object} eventBus app event manager
     * @param {Object} data data object passed to event handlers: item and its amount
     * @returns {Element} add to cart button
     */
    function createAddBtn(eventBus, data) {
        var btn, btnAtts = {'className': addToCartBtnClass, 'innerText': 'Add'};
        btn = helpers.createCustomElement('button', btnAtts);
        eventBus.subscribe(eventBus.addItemBtnClicked, function(data) {
            data.amount.value = parseInt(data.amount.value) + 1;
        });
        btn.onclick = function() {
            eventBus.publish(eventBus.addItemBtnClicked, data);
            eventBus.publish(eventBus.addItemToCartEvent, data);
        };
        return btn;
    }

    /*
     * Creates remove from cart button
     * @param {Object} eventBus app event manager
     * @param {Object} data data object passed to event handlers: item and its amount
     * @returns {Element} remove cart button
     */
    function createRemoveBtn(eventBus, data) {
        var btn, btnAtts = {'className': removeFromCartBtnClass, 'innerText': 'Remove'};
        btn = helpers.createCustomElement('button', btnAtts);
        eventBus.subscribe(eventBus.removeItemBtnClicked, function(data) {
            var itemAmount = parseInt(data.amount.value, 10);
            if (itemAmount > 0) {
                data.amount.value = itemAmount - 1;
            }
        });
        btn.onclick = function() {
            eventBus.publish(eventBus.removeItemBtnClicked, data);
            eventBus.publish(eventBus.removeItemFromCartEvent, data);
        };
        return btn;
    }

    /*
     * TODO: handle input
     */
    function createItemAmountElement(eventBus, item) {
        var atts = {'className': itemAmountInputClass, 'value': 0},
            itemAmount = helpers.createCustomElement('input', atts);
        eventBus.subscribe(eventBus.resetItemAmountEvent + item.id, function() {
            itemAmount.value = 0;
        });
        itemAmount.onchange = function() {
            eventBus.publish(eventBus.setItemAmountEvent, {'item': item, 'amount': parseInt(itemAmount.value)});
        };
        return itemAmount;
    }

    /**
     * Appends cart buttons to the specified element.
     * @param {Element} parentElement a reference to a element to append buttons to
     * @param {Object} item item object corresponding to created buttons
     * @param {Object} eventBus app event manager
     */
    function appendCartBtns(parentElement, item, eventBus) {
        var itemAmount, container, data;
        container = helpers.appendChild(parentElement, 'span', {'className': cartBtnsContainerClass});
        itemAmount = createItemAmountElement(eventBus, item);
        container.appendChild(itemAmount);
        data = {'amount': itemAmount, 'item': item};
        container.appendChild(createAddBtn(eventBus, data));
        container.appendChild(createRemoveBtn(eventBus, data));
    }
    return {
        appendCartBtns: appendCartBtns
    };
}