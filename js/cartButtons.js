/**
 * Created by mariao on 7/7/15.
 */
function cartButtons() {

    var ITEM_AMOUNT_CONTAINER = 'item-amount',
        ITEM_AMOUNT_INPUT = 'amount',
        ITEM_AMOUNT_ADD_BTN = 'add',
        ITEM_AMOUNT_REMOVE_BTN = 'remove';

    function createAddBtn(eventBus, data) {
        var btn, btnAtts = {'className': ITEM_AMOUNT_ADD_BTN, 'innerText': 'Add'};
        btn = helpers.createCustomElement('button', btnAtts);
        eventBus.subscribe(events.addItemBtnClicked, function(data) {
            data.amount.value = parseInt(data.amount.value) + 1;
        });
        btn.onclick = function() {
            eventBus.publish(events.addItemBtnClicked, data);
            eventBus.publish(events.addItemToCart, data);
        };
        return btn;
    }

    function createRemoveBtn(eventBus, data) {
        var btn, btnAtts = {'className': ITEM_AMOUNT_REMOVE_BTN, 'innerText': 'Remove'};
        btn = helpers.createCustomElement('button', btnAtts);
        eventBus.subscribe(events.removeItemBtnClicked, function(data) {
            var itemAmount = parseInt(data.amount.value);
            if (itemAmount > 0) {
                data.amount.value = itemAmount - 1;
            }
        });
        btn.onclick = function() {
            eventBus.publish(events.removeItemBtnClicked, data);
            eventBus.publish(events.removeItemFromCart, data);
        };
        return btn;
    }

    function createItemAmountElement(eventBus, id) {
        var itemAmount, atts = {'className': ITEM_AMOUNT_INPUT, 'value': '0', 'disabled': 'true'};
        itemAmount = helpers.createCustomElement('input', atts);
        eventBus.subscribe(events.resetItemAmount + id, function() {
            itemAmount.value = 0;
        });
        return itemAmount;
    }


    /**
     * Appends cart buttons to the specified element.
     * @param {Element} parentElement a reference to a element to append buttons to
     * @param {Object} eventBus
     * @param {Number} itemPrice
     */
    function appendCartBtns(parentElement, item, eventBus) {
        var itemAmount, container, data;
        container = helpers.appendChild(parentElement, 'span', {'className': ITEM_AMOUNT_CONTAINER});
        itemAmount = createItemAmountElement(eventBus, item.id);
        container.appendChild(itemAmount);
        data = {'amount': itemAmount, 'item': item};
        container.appendChild(createAddBtn(eventBus, data));
        container.appendChild(createRemoveBtn(eventBus, data));
    }
    return {
        appendCartBtns: appendCartBtns
    };
}