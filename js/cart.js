/*
 * Loads cart module into the app.
 */
(function(app) {
    var eventBus = app.eventBus,

        coupons,
        couponTypes,
        getItemClone,

        itemsTableHeaders,
        couponDiscount = 0,
        addedCoupons = [],
        addedItems = {};

    /**
     * Sets number of items added to the cart to the specified value.
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
     * @param {Object} data object {item: item, amount: amount}, where item is the item object to be removed
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
        reloadCouponTable(addedCoupons);
        refreshTotalBill();
    }

    /**
     * Returns item discount with respect to discounts of coupons added so far.
     * @param {Object} item an item instance
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
     * @param {Item} item an item instance
     * @returns {number} item price after discount
     */
    function getItemPrice(item) {
        return +((item.price * (100 - getDiscount(item))) / 100).toFixed(2);
    }

    /**
     * Returns coupon object by coupon code
     * @param {String} couponCode id of a coupon
     * @returns {*} coupon object with this id
     */
    function getCouponByID(couponCode) {
        var i;
        for (i = 0; i < coupons.length; i++) {
            if (coupons[i].getCode() == couponCode) {
                break;
            }
        }
        return coupons[i];
    }
    /**
     * Validates coupon submitted by user and updates the cart accordingly.
     */
    function addCoupon() {
        var couponCode, coupon;
        couponCode = popCouponCode();
        if (addedCoupons.indexOf(couponCode) > -1) {
            return;
        }
        coupon = getCouponByID(couponCode);
        if (coupon) {
            addedCoupons.push(couponCode);
            if (coupon instanceof couponTypes.DiscountCoupon) {
                couponDiscount += coupon.getDiscountValue();
                couponDiscount = (couponDiscount > 100) ? 100 : couponDiscount;
            }
            else {
                addItemToCart({item: coupon.getFreeItem()});
            }
        }
        refreshCart();
    }

    /**
     * Initializes the cart.
     */
    function init(itemsData, couponsData) {
        itemsTableHeaders = itemsData.basicItemKeys.concat('amount', 'discount', 'total');
        coupons = couponsData.coupons;
        getItemClone = itemsData.getItemClone;
        couponTypes = couponsData.couponTypes;
        initTables();
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
        itemsTableElement = document.querySelector('.cart-table'),
        couponTableElement = document.querySelector('.coupon-table'),
        totalBillElement = document.querySelector('.total-bill'),

        couponTableHeaders = ['code', 'details'];

    /**
     * Initializes cart tables.
     */
    function initTables() {
        view.loadTableHead(itemsTableElement, itemsTableHeaders, appendSortBtn);
        view.loadTableHead(couponTableElement, couponTableHeaders, appendSortBtn);
    }

    /**
     * Reloads the cart table.
     * @param {Array} items items added to the cart so far.
     */
    function reloadCartTable(items) {
        var rows = view.createRowElements(items, itemsTableHeaders, appendCartTableCellContent);
        view.loadRows(itemsTableElement, rows, 0, items.length);
    }
    /**
     * Appends a content to the given cart table cell.
     * @param {String} cellClass class name of the cell to append content to
     * @param {Object} item an item object corresponding to this cell
     * @param {Element} cell an element corresponding to that item
     */
    function appendCartTableCellContent(cellClass, item, cell) {
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
     * Reloads the coupon table.
     * @param {Array} addedCoupons IDes of the coupons added by user
     */
    function reloadCouponTable(addedCoupons) {
        var couponObjs = [], rows;
        addedCoupons.forEach(function(id) {
            couponObjs.push(getCouponByID(id));
        });
        rows = view.createRowElements(couponObjs, couponTableHeaders, appendCouponTableCellContent);
        view.loadRows(couponTableElement, rows, 0, couponObjs.length);
    }
    /**
     * Appends a content to the given coupon table cell.
     * @param {String} cellClass class name of the cell to append content to
     * @param {Object} coupon coupon object corresponding to this cell
     * @param {Element} cell an element corresponding to that coupon
     */
    function appendCouponTableCellContent(cellClass, coupon, cell) {
        switch (cellClass) {
            case 'code':
                cell.innerText = coupon.getCode();
                break;
            default:
                if (coupon instanceof couponTypes.FreeItemCoupon) {
                    cell.innerText = 'Free item ID: ' + coupon.getFreeItem().id;
                }
                else {
                    cell.innerText = 'Discount val: ' + coupon.getDiscountValue();
                }
        }

    }

    /**
     * Hides the cart.
     */
    function hideCart() {
        view.hideElements([hideCartBtn, cartDetails, couponInputContainer]);
        view.exposeElements([viewCartBtn]);
    }

    /**
     * Shows the cart.
     */
    function exposeCart() {
        view.exposeElements([cartDetails, hideCartBtn, couponInputContainer]);
        view.hideElements([viewCartBtn]);
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
