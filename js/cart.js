/**
 * Created by mariao on 7/6/15.
 */

/*
 * Loads cart module into the app.
 */
(function(app) {
    var eventBus = app.eventBus,

        couponInputField = document.querySelector('.coupon-input'),
        couponSubmitBtn = document.querySelector('.coupon-submit-btn'),
        resetCartBtn = document.querySelector('.reset-cart-btn'),
        viewCartBtn = document.querySelector('.view-cart-btn'),
        hideCartBtn = document.querySelector('.hide-cart-btn'),
        couponInputContainer = document.querySelector('.coupon-input-container'),
        cartDetails = document.querySelector('.cart-details'),
        tableElement = document.querySelector('.cart-table'),
        totalBillElement = document.querySelector('.total-bill'),

        cartTableHeaders,
        couponDiscount = 0,
        addedCoupons = [],
        coupons,
        addedItems = {};

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
            setTotalBillValue(getTotalBillValue() - getItemPrice(item) * addedItems[item.id].amount);
        }
        setTotalBillValue(getTotalBillValue() + getItemPrice(item) * amount);
        addedItems[item.id].amount = amount;
        refreshCart();
    }

    /**
     * Adds a new item into the cart.
     * @param {Object} data object containing item to be added.
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
        setTotalBillValue(getTotalBillValue() + getItemPrice(item));
        refreshCart();
    }

    /**
     * Removes an item from the cart.
     * @param {Object} data object containing item to be removed.
     */
    function removeItemFromCart(data) {
        var item = data.item;
        addedItems[item.id].amount = addedItems[item.id].amount - 1;
        setTotalBillValue(getTotalBillValue() - getItemPrice(item));
        refreshCart();
    }

    /**
     * Removes all items from the cart.
     */
    function resetCart() {
        var id;
        for (id in addedItems) {
            eventBus.publish(eventBus.eventNames.resetItemAmount + id, {});
        }
        addedItems = [];
        addedCoupons = [];
        setTotalBillValue(0);
        refreshCart();
    }

    function refreshTotalBill() {
        var totalBill = 0, id;
        for (id in addedItems) {
            totalBill += getItemPrice(addedItems[id]);
        }
        setTotalBillValue(totalBill.toFixed(2));
    }
    /**
     * Refreshes the cart after an update.
     */
    function refreshCart() {
        var items = [], rows, id;
        for (id in addedItems) {
            if (addedItems[id].amount > 0) {
                items.push(addedItems[id]);
            }
        }
        rows = helpers.createRowElements(items, cartTableHeaders, appendContent);
        helpers.loadRows(tableElement, rows, 0, items.length);
        refreshTotalBill();
    }

    function getDiscount(item) {
        var discount = item.discount + couponDiscount;
        if (discount > 100) {
            discount = 100;
        }
        return discount;
    }
    /**
     * Returns item price after discount.
     * @param {Item} item an item
     * @returns {number} item price after discount
     */
    function getItemPrice(item) {
        return +((item.price * (100 - getDiscount(item))) / 100).toFixed(2);
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
                cell.innerText = String((getItemPrice(item) * item.amount).toFixed(2));
                break;
            case 'discount':
                cell.innerText = getDiscount(item);
                console.log(getDiscount(item));
                break;
            default:
                cell.innerText = item[cellClass];
        }
    }

    function appendSortBtn(parentElement, key, asc) {
        // not supported
    }

    /**
     * Hides the cart.
     * @param {Object} e event
     */
    function hideCartBtnHandler(e) {
        e.preventDefault();
        helpers.hideElement(hideCartBtn);
        helpers.hideElement(cartDetails);
        helpers.hideElement(couponInputContainer);
        helpers.exposeElement(viewCartBtn);
    }
    /**
     * Resets the cart when rest button clicked.
     * @param {Object} e event
     */
    function resetCartBtnHandler(e) {
        e.preventDefault();
        resetCart();
    }
    /**
     * Shows the cart to user.
     * @param {Object} e event
     */
    function viewCartBtnHandler(e) {
        e.preventDefault();
        helpers.exposeElement(cartDetails);
        helpers.exposeElement(hideCartBtn);
        helpers.exposeElement(couponInputContainer);
        helpers.hideElement(viewCartBtn);
        refreshCart();
    }

    /**
     * Validates coupon submitted by user and updates the cart accordingly.
     * @param e event
     */
    function couponSubmitBtnHandler(e) {
        var couponCode, i;
        e.preventDefault();
        couponCode = couponInputField.value;
        couponInputField.value = '';
        if (addedCoupons.indexOf(couponCode) > -1) {
            return;
        }
        addedCoupons.push(couponCode);
        for (i = 0; i < coupons.length; i++) {
            if (coupons[i].code == couponCode) {
                break;
            }
        }
        if (coupons[i].freeItem) {
            addItemToCart({item: coupons[i].freeItem});
        }
        if (coupons[i].discountValue) {
            couponDiscount += coupons[i].discountValue;
            couponDiscount = (couponDiscount > 100) ? 100 : couponDiscount;
        }
        refreshCart();
    }

    /**
     * Returns total bill value.
     * @returns {Number} total bill.
     */
    function getTotalBillValue() {
        return parseInt(totalBillElement.value, 10);
    }

    function setTotalBillValue(value) {
        totalBillElement.value = value;
    }

    /**
     * Initializes the cart.
     */
    function init(itemKeys, couponsArray) {
        cartTableHeaders = itemKeys.concat('amount', 'discount', 'total');
        coupons = couponsArray;

        helpers.loadTableHead(tableElement, cartTableHeaders, appendSortBtn);

        hideCartBtn.addEventListener('click', hideCartBtnHandler);
        resetCartBtn.addEventListener('click', resetCartBtnHandler);
        viewCartBtn.addEventListener('click', viewCartBtnHandler);
        couponSubmitBtn.addEventListener('click', couponSubmitBtnHandler);

        eventBus.subscribe(eventBus.eventNames.addItemToCart, addItemToCart);
        eventBus.subscribe(eventBus.eventNames.removeItemFromCart, removeItemFromCart);
        eventBus.subscribe(eventBus.eventNames.setItemAmountInCart, setItemAmount);
    }

    app.cart = {
        init: init
    };
}(app));
