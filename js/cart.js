/**
 * Created by mariao on 7/6/15.
 */

/*
 * Loads cart module into the app.
 */
(function(app) {
    var ITEM_NOT_FOUND = -1,

        totalBill = document.querySelector('.total-bill'),
        resetCartBtn = document.querySelector('.reset-cart-btn'),

        addedItems = [];

    /**
     * Returns total bill value.
     * @returns {Number} total bill.
     */
    function getTotalBillValue() {
        return parseInt(totalBill.value, 10);
    }

    /**
     * Returns index of the item in the cart by item ID.
     * @param {Number} id item id to search
     * @returns {Number} item index in the cart
     */
    function getItemIndexByID(id) {
        var i;
        for (i = 0; i < addedItems.length; i++) {
            if (addedItems[i].id === id) {
                return i;
            }
        }
        return ITEM_NOT_FOUND;
    }

    /**
     * Adds a new item into the cart.
     * @param {Object} data object containing item to add.
     */
    function addItemToCart(data) {
        var item = data.item, itemIndex, itemClone;
        itemIndex = getItemIndexByID(item.id);
        if (itemIndex !== ITEM_NOT_FOUND) {
            addedItems[itemIndex].amount++;
            totalBill.value = getTotalBillValue() + item.price;
        }
        else {
            itemClone = JSON.parse(JSON.stringify(item));
            itemClone.amount = 1;
            addedItems.push(itemClone);
            totalBill.value = getTotalBillValue() + itemClone.price;
        }
    }

    /**
     * Removes an item from the cart.
     * @param {Object} data object containing item to remove.
     */
    function removeItemFromCart(data) {
        var item = data.item, itemIndex;
        itemIndex = getItemIndexByID(item.id);
        if (itemIndex == ITEM_NOT_FOUND) {
            console.log('attempt to remove from cart nonexistent item');
            return;
        }
        if (addedItems[itemIndex].amount && addedItems[itemIndex].amount > 0) {
            addedItems[itemIndex].amount = addedItems[itemIndex].amount - 1;
            totalBill.value = getTotalBillValue() - item.price;
        }
    }

    /**
     * Initializes the cart and all its event listeners.
     * @param {Object} eventBus app event manager
     */
    function init(eventBus) {
        resetCartBtn.onclick = function () {
            addedItems.forEach(function(item) {
                eventBus.publish(events.resetItemAmountEvent + item.id, {});
            });
            addedItems = [];
            totalBill.value = 0;
        };

        eventBus.subscribe(events.addItemToCartEvent, addItemToCart);

        eventBus.subscribe(events.removeItemFromCartEvent, removeItemFromCart);
    }

    app.cart = {
        init: init
    };
})(app);