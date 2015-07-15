/*
 * Loads cart module into the app.
 */
(function(app) {
    var eventBus = app.eventBus,

        coupons,
        couponTypes,
        getItemClone,

        cartTableHeaders,
        couponDiscount = 0,
        addedCoupons = [],
        addedItems = {};

    /**
     * Sets number of items added to the cart to a specified value.
     * @param {Object} data object {item: item, amount: amount}.
     */
    function setItemAmount(data) {
        var item = data.item, amount = data.amount, itemClone;
        if (!addedItems[item.id]) {
            itemClone = getItemClone(item);
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
     * @param {Object} data object {item: item, amount: amount}.
     */
    function addItemToCart(data) {
        var item = data.item, itemClone;
        if (!addedItems[item.id]) {
            itemClone = getItemClone(item);
            itemClone.amount = 0;
            addedItems[item.id] = itemClone;
        }
        addedItems[item.id].amount++;
        refreshCart();
    }

    /**
     * Removes an item from the cart.
     * @param {Object} data object {item: item, amount: amount}.
     */
    function removeItemFromCart(data) {
        var item = data.item;
        addedItems[item.id].amount = addedItems[item.id].amount - 1;
        refreshCart();
    }

    /**
     * Resets the cart.
     */
    function resetCart() {
        var id;
        for (id in addedItems) {
            eventBus.publish(eventBus.eventNames.resetItemAmount + id, {});
        }
        addedItems = {};
        addedCoupons = [];
        couponDiscount = 0;
        refreshCart();
    }

    /**
     * Recalculates total bill.
     */
    function refreshTotalBill() {
        var totalBill = 0, id;
        for (id in addedItems) {
            totalBill += getItemPrice(addedItems[id]) * addedItems[id].amount;
        }
        totalBill = totalBill.toFixed(2);
        setTotalBillValue(totalBill);
    }
    /**
     * Refreshes the cart after an update.
     */
    function refreshCart() {
        var items = [], id;
        for (id in addedItems) {
            if (addedItems[id].amount > 0) {
                items.push(addedItems[id]);
            }
        }
        reloadCartTable(items);
        refreshTotalBill();
    }

    /**
     * Returns item discount with respect to discount of coupons added so far.
     * @param {Object} item an item
     * @returns {*} total discount
     */
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
     * Validates coupon submitted by user and updates the cart accordingly.
     */
    function addCoupon() {
        var couponCode, i;
        couponCode = popCouponCode();
        if (addedCoupons.indexOf(couponCode) > -1) {
            return;
        }
        addedCoupons.push(couponCode);
        for (i = 0; i < coupons.length; i++) {
            if (coupons[i].getCode() == couponCode) {
                break;
            }
        }
        if (coupons[i]) {
            if (coupons[i] instanceof couponTypes.FreeItemCoupon) {
                addItemToCart({item: coupons[i].getFreeItem()});
            }
            else {
                couponDiscount += coupons[i].getDiscountValue();
                couponDiscount = (couponDiscount > 100) ? 100 : couponDiscount;
            }
        }
        refreshCart();
    }

    /**
     * Initializes the cart.
     */
    function init(itemsData, couponsData) {
        cartTableHeaders = itemsData.basicItemKeys.concat('amount', 'discount', 'total');
        coupons = couponsData.coupons;
        getItemClone = itemsData.getItemClone;
        couponTypes = couponsData.couponTypes;
        initCartTable();
        addEventListeners();
    }

    app.cart = {
        init: init
    };

    /**************************************************************************************************
     *                                              Cart UI Manipulations
     **************************************************************************************************/
    var couponSubmitBtn = document.querySelector('.coupon-submit-btn'),
        resetCartBtn = document.querySelector('.reset-cart-btn'),
        viewCartBtn = document.querySelector('.view-cart-btn'),
        hideCartBtn = document.querySelector('.hide-cart-btn');

    /**
     * Adds all cart event handlers.
     */
    function addEventListeners() {
        hideCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideCart();
        });
        resetCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetCart();
        });
        viewCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exposeCart();
            refreshCart();
        });
        couponSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addCoupon();
        });

        eventBus.subscribe(eventBus.eventNames.addItemToCart, addItemToCart);
        eventBus.subscribe(eventBus.eventNames.removeItemFromCart, removeItemFromCart);
        eventBus.subscribe(eventBus.eventNames.setItemAmountInCart, setItemAmount);
    }

    /**************************************************************************************************
     *                                              Cart DOM Helpers
     **************************************************************************************************/
    var couponInputField = document.querySelector('.coupon-input'),
        couponInputContainer = document.querySelector('.coupon-input-container'),
        cartDetails = document.querySelector('.cart-details'),
        tableElement = document.querySelector('.cart-table'),
        totalBillElement = document.querySelector('.total-bill');

    /**
     * Initializes the cart table.
     */
    function initCartTable() {
        view.loadTableHead(tableElement, cartTableHeaders, appendSortBtn);
    }

    /**
     * Reloads the cart table.
     * @param {Array} items items added to the cart so far.
     */
    function reloadCartTable(items) {
        var rows = view.createRowElements(items, cartTableHeaders, appendContent);
        view.loadRows(tableElement, rows, 0, items.length);
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
                break;
            default:
                cell.innerText = item[cellClass];
        }
    }

    /**
     * Hides the cart.
     */
    function hideCart() {
        view.hideElement(hideCartBtn);
        view.hideElement(cartDetails);
        view.hideElement(couponInputContainer);
        view.exposeElement(viewCartBtn);
    }

    /**
     * Shows the cart.
     */
    function exposeCart() {
        view.exposeElement(cartDetails);
        view.exposeElement(hideCartBtn);
        view.exposeElement(couponInputContainer);
        view.hideElement(viewCartBtn);
    }

    function appendSortBtn(parentElement, key, asc) {
        // not supported
    }

    /**
     * Returns coupon code entered by user and clears coupon enter field.
     * @returns {String} coupon code
     */
    function popCouponCode() {
        var couponCode = couponInputField.value;
        couponInputField.value = '';
        return couponCode;
    }
    /**
     * Returns total bill value.
     * @returns {Number} total bill.
     */
    function getTotalBillValue() {
        return parseInt(totalBillElement.value, 10);
    }

    /**
     * Sets total bill value
     * @param value new value
     */
    function setTotalBillValue(value) {
        totalBillElement.value = value;
    }

}(app));
