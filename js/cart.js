/**
 * Created by mariao on 7/6/15.
 */

/*
 * Loads cart module into the app.
 */
(function(app) {
    var totalBillElement = document.querySelector('.total-bill'),
        resetCartBtn = document.querySelector('.reset-cart-btn'),
        viewCartBtn = document.querySelector('.view-cart-btn'),
        hideCartBtn = document.querySelector('.hide-cart-btn'),
        cartDetails = document.querySelector('.cart-details'),

        tableElement = document.querySelector('.cart-table'),

        eventBus = app.eventBus,

        cartTableHeaders,
        addedItems = {};

    /**
     * Returns total bill value.
     * @returns {Number} total bill.
     */
    function getTotalBillValue() {
        return parseInt(totalBillElement.value, 10);
    }

    /**
     * Sets item amount of the given item.
     * @param {Object} data object { item: item, itemAmountElement: amount }
     */
    function setItemAmount(data) {
        var item = data.item, amount = data.amount, itemClone;
        if (!addedItems[item.id]) {
            itemClone = JSON.parse(JSON.stringify(item));
            itemClone.amount = amount;
            addedItems[item.id] = itemClone;
        }
        else {
            totalBillElement.value = getTotalBillValue() - item.price * addedItems[item.id].amount;
        }
        totalBillElement.value = getTotalBillValue() + item.price * amount;
        addedItems[item.id].amount = amount;
        refreshCart();
    }

    /**
     * Adds a new item into the cart.
     * @param {Object} data object containing item to add.
     */
    function addItemToCart(data) {
        var item = data.item, itemClone;
        if (addedItems[item.id]) {
            addedItems[item.id].amount++;
        }
        else {
            itemClone = JSON.parse(JSON.stringify(item));
            itemClone.amount = 1;
            addedItems[item.id] = itemClone;
        }
        totalBillElement.value = getTotalBillValue() + item.price;
        refreshCart();
    }

    /**
     * Removes an item from the cart.
     * @param {Object} data object containing item to remove.
     */
    function removeItemFromCart(data) {
        var item = data.item;
        addedItems[item.id].amount = addedItems[item.id].amount - 1;
        totalBillElement.value = getTotalBillValue() - item.price;
        refreshCart();
    }

    /**
     * Removes all items from the cart.
     */
    function resetCart() {
        var id;
        for (id in addedItems) {
            eventBus.publish(eventBus.eventNames.resetItemAmount + id, {});
        };
        addedItems = [];
        totalBillElement.value = 0;
        refreshCart();
    }

    /**
     * Exposes the given element.
     * @param element an element
     */
    function expose(element) {
        if (element.classList.contains('visuallyhidden')) {
            element.classList.remove('visuallyhidden');
        }
    }

    /**
     * Hides the given element
     * @param element an element
     */
    function hide(element) {
        if (!element.classList.contains('visuallyhidden')) {
            element.classList.add('visuallyhidden');
        }
    }


    /**
     * Shows the cart to user.
     */
    function refreshCart() {
        var items = [], rows, id;
        for (id in addedItems) {
            if (addedItems[id].amount > 0) {
                items.push(addedItems[id]);
            }
        };
        rows = helpers.createRowElements(items, cartTableHeaders, appendContent);
        helpers.loadRows(tableElement, rows, 0, items.length);
    }

    /**
     * Appends a content to the given cell.
     * @param {String} cellClass class name of the cell to append content to
     * @param {Object} item an item corresponding to this cell
     * @param {Element} cell an element corresponding to that item
     */
    function appendContent(cellClass, item, cell) {
        switch (cellClass) {
            case 'total':
                cell.innerText = item.amount * item.price;
                break;
            default :
                cell.innerText = item[cellClass];
        }
    }

    /**
     * Appends a sort button to a given header cell element.
     * @param {Element} parentElement a parent element to append the button to
     * @param {String} key sorting property
     * @param {Boolean} asc sorting order, if true then ascending, otherwise - descending
     */
    function appendSortBtn(parentElement, key, asc) {

    }

    /**
     * Initializes the cart and all its event listeners.
     */
    function init(itemKeys) {
        cartTableHeaders = itemKeys.concat('amount', 'total');

        helpers.loadTableHead(tableElement, cartTableHeaders, appendSortBtn);

        hideCartBtn.onclick = function(e) {
            e.preventDefault();
            hide(hideCartBtn);
            hide(cartDetails);
            expose(viewCartBtn);
        };

        resetCartBtn.onclick = function(e) {
            e.preventDefault();
            resetCart();
        };
        viewCartBtn.onclick = function(e) {
            e.preventDefault();
            expose(cartDetails);
            expose(hideCartBtn);
            hide(viewCartBtn);
            refreshCart();
        };

        eventBus.subscribe(eventBus.eventNames.addItemToCart, addItemToCart);
        eventBus.subscribe(eventBus.eventNames.removeItemFromCart, removeItemFromCart);
        eventBus.subscribe(eventBus.eventNames.setItemAmountInCart, setItemAmount);
    }

    app.cart = {
        init: init
    };
}(app));
