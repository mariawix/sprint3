/**
 * Created by mariao on 6/29/15.
 */

/*
 * Class names of dynamically created elements
 */
var CLASS_NAMES = {
    itemAmountController: 'item-amount', // Element containing add/remove buttons and item amount element
    itemAmount: 'amount',                // Element displaying amount of item added to the cart
    addItemBtn: 'add',                   // Button enabling adding items to the cart
    removeItemBtn: 'remove',             // Button enabling removing items from the cart
    sortAsc: 'sort-asc-btn',             // Button enabling sorting items in ascending order
    sortDesc: 'sort-desc-btn',           // Button enabling sorting items in descending order
    itemPrice: 'price',                  // Element containing item price value
    pageBtn: 'page-btn',                 // Pagination bar button
    curPageBtn: 'current-page-btn',      // Current page button
    pageLink: 'page-link'                // Page link
};

(function () {
    "use strict";
    var itemsTable = document.querySelector('.items-table'),                // items table
        itemsNmbEl = document.querySelector('.displayed-items-nmb-input'),  // DOM element holding number of items per page
        totalBillEl = document.querySelector('.total-bill'),                // DOM element holding total bill
        paginationEl = document.querySelector('.pages-nav'),                // pagination bar
        resetCartBtn = document.querySelector('.reset-cart-btn'),           // DOM element enabling resetting cart
        tbody = document.createElement('tbody'),                            // body of the items table
        itemEls = [],               // item elements
        theaders = [],              // headers of the items table
        eventBus = new PubSub();    // events manager

    /**
     * Creates head of the items table using properties of an ITEMS object.
     */
    function loadHeaders() {
        var thead = document.createElement('thead'),
            tr = document.createElement('tr'),
            fragment = document.createDocumentFragment(),
            th, key;
        for (key in ITEMS[0]) {
            theaders.push(key);
            th = appendChild(tr, 'th', {'innerText': key});
            th.appendChild(sortBtn(key, true));
            th.appendChild(sortBtn(key, false));
        }
        appendChild(tr, 'th', {'innerText': 'cart'});
        thead.appendChild(tr);
        fragment.appendChild(thead);
        itemsTable.appendChild(fragment);
    }

    /**
     * Creates all the item elements including add and remove buttons.
     */
    function createItemElements() {
        var i = 0, j = 0, tr, addHandlerID = -1, removeHandlerID = -1, cartBtnsIDs = {}, className = '';
        for (j = 0; j < ITEMS.length; j++) {
            tr = document.createElement('tr');
            tr.dataset.index = j;
            for (i = 0; i < theaders.length; i++) {
                className =  theaders[i];
                if (className === 'image') {
                    appendChild(tr, 'td', {'innerHTML': '<img src="' + ITEMS[j][className] + '" alt="" />', 'className': className});
                }
                else {
                    appendChild(tr, 'td', {'innerText': ITEMS[j][className], 'className': className});
                }

            }
            cartBtnsIDs = createAddRemoveBtns(tr, addHandlerID, removeHandlerID);
            addHandlerID = cartBtnsIDs.addHandlerID;
            removeHandlerID = cartBtnsIDs.removeHandlerID;
            itemEls.push(tr);
        }
    }

    /**
     * Loads items with indexes [firstIndex (including), lastIndex (excluding)) to the table
     * @param {Number} firstIndex index of the first item to be loaded
     * @param {Number} lastIndex index at which to end loading
     */
    function loadItems(firstIndex, lastIndex) {
        var fragment = document.createDocumentFragment(), i = 0;
        lastIndex = (lastIndex < ITEMS.length) ? lastIndex : ITEMS.length;
        tbody.innerHTML = "";
        for (i = firstIndex; i < lastIndex; i++) {
            tbody.appendChild(itemEls[i]);
        }
        fragment.appendChild(tbody);
        itemsTable.appendChild(fragment);
    }

    /**
     * Creates items per page change event listener and subscribes it to the event bus.
     */
    function createItemsAmountInputHandler() {
        var eventName = 'onchange',
            id = 0, firstItem = 0, newCurPage = 0, topRow = 0;
        id = eventBus.subscribe(eventName, function (itemsAmount) {
            topRow = parseInt(tbody.querySelector('tr:first-child').dataset.index);
            newCurPage = Math.floor(topRow / itemsAmount) + 1;
            firstItem = (newCurPage - 1) * itemsAmount;
            loadItems(firstItem, firstItem + itemsAmount);
            loadPaginationBar(newCurPage);
        });
        itemsNmbEl[eventName] = function () {
            eventBus.publish(eventName, id, parseInt(this.value));
        }
    }

    /**
     * Initializes pagination bar.
     * @param {Number} curPage number of displayed page
     */
    function loadPaginationBar(curPage) {
        var fragment = document.createDocumentFragment(),
            pageNmb,
            displayedItemsNmb = (itemsNmbEl.value < ITEMS.length) ? itemsNmbEl.value : ITEMS.length,
            paginationBtn,
            className = '',
            pageItemAtts, firstItemIndex, endItemIndex;
        paginationEl.innerHTML = "";

        for (pageNmb = 1; (pageNmb - 1) * displayedItemsNmb < ITEMS.length; pageNmb++) {
            className = (pageNmb === curPage) ? (CLASS_NAMES.curPageBtn + ' ' + CLASS_NAMES.pageBtn) : CLASS_NAMES.pageBtn;
            firstItemIndex = (pageNmb - 1) * displayedItemsNmb;
            endItemIndex = pageNmb * displayedItemsNmb;
            pageItemAtts = {
                'className': className,
                'dataset': { 'paging': '{"start": ' + firstItemIndex + ', "end": ' + endItemIndex + '}' }
            };
            paginationBtn = appendChild(fragment, 'li', pageItemAtts);
            appendChild(paginationBtn, 'span', {'className': CLASS_NAMES.pageLink, 'innerText': pageNmb});
            pageBtnHandler(paginationBtn);
        }
        paginationEl.appendChild(fragment);
    }

    /**
     * Creates a listener for reset cart event and subscribes it to the event bus.
     */
    function handleResetCartButton() {
        var id = 0,
            eventName = 'onclick';
        id = eventBus.subscribe(eventName, function () {
            itemEls.forEach(function(element) {
                getByClassName(element, CLASS_NAMES.itemAmount).value = 0;
            });
            totalBillEl.value = 0;
        });
        resetCartBtn[eventName] = function () {
            eventBus.publish(eventName, id, {});
        };
    }



    loadHeaders();
    createItemElements();
    loadItems(0, parseInt(itemsNmbEl.value));
    createItemsAmountInputHandler();
    loadPaginationBar(1);
    handleResetCartButton();




    /**************************************************************************************************
     *                                              Helpers
     **************************************************************************************************/
    /**
     * Creates a new DOM element and appends it to the specified parent element.
     * @param {Element} parentElement parent element of the newly created element
     * @param {String} childName tag name of the child element
     * @param {Object} childAtts attributes of the child element in the form {name: value, name: value ...}
     * @returns {Element} the newly created element
     */
    function appendChild(parentElement, childName, childAtts) {
        var key,
            datasetKey = '',
            childElement = document.createElement(childName);
        for (key in childAtts) {
            if (key === 'dataset') {
                for (datasetKey in childAtts[key]) {
                    childElement[key][datasetKey] = childAtts[key][datasetKey];
                }
            }
            else {
                childElement[key] = childAtts[key];
            }
        }
        parentElement.appendChild(childElement);
        return childElement;
    }

    /**
     * Reindexes item DOM elements
     * @returns {Array} reindexed elements
     */
    function reindexItemsElements() {
        var i;
        for (i = 0; i < itemEls.length; i++) {
            itemEls[i].dataset.index = i;
        }
        return itemEls;
    }

    /**
     * Creates sort button and its click handler
     * @param key sorting property
     * @param asc if true then uses ascending order, otherwise - descending
     * @returns {Element} created button
     */
    function sortBtn(key, asc) {
        var sortAscBtn = document.createElement('span'),
            eventName = 'onclick',
            id = 0;
        sortAscBtn.innerHTML = (asc) ? '&uarr;' : '&darr;';
        sortAscBtn.className = (asc) ? CLASS_NAMES.sortAsc : CLASS_NAMES.sortDesc;
        id = eventBus.subscribe(eventName, function() {
            itemEls.sort(function(item1, item2) {
                var el1val, el2val, res;
                el1val = item1.querySelector('.' + key).innerText;
                el2val = item2.querySelector('.' + key).innerText;
                el1val = (key === 'name') ? el1val : parseInt(el1val);
                el2val = (key === 'name') ? el2val : parseInt(el2val);
                if (asc) {
                    return (el1val > el2val) ? 1 : ((el1val < el2val) ? -1 : 0);
                }
                else {
                    return (el1val > el2val) ? -1 : ((el1val < el2val) ? 1 : 0);
                }
            });
            reindexItemsElements();
            loadItems(0, parseInt(itemsNmbEl.value));
            loadPaginationBar(1);
        });
        sortAscBtn[eventName] = function() {
            eventBus.publish(eventName, id, key);
        }
        return sortAscBtn;
    }

    /**
     * Creates an event listener for "add" button click and subscribes it to the event bus.
     * @param {Element} target a reference to the add button element that dispatched the event
     * @param {Number} itemAmountElement amount of the item added to the cart
     * @param {Number} price price of the added item
     * @param {Number} id id of the callback function handling the event, if -1 then the callback will be created
     * @returns {Number} id of the callback function handling the event
     */
    function addToCartHandler(target, itemAmountElement, price, id) {
        var eventName = 'onclick';
        if (id === -1) {
            id = eventBus.subscribe(eventName, function (data) {
                var totalBill = parseInt(totalBillEl.value);
                data.amount.value = parseInt(data.amount.value) + 1;
                totalBillEl.value = totalBill + data.price;
            });
        }
        target[eventName] = function () {
            eventBus.publish(eventName, id, {'amount': itemAmountElement, 'price': price});
        }
        return id;
    }

    /**
     * Creates an event listener for "remove" button click and subscribes it to the event bus.
     * @param {Element} target a reference to the remove button element that dispatched the event
     * @param {Number} itemAmountElement amount of the item added to the cart
     * @param {Number} price price of the added item
     * @param {Number} id id of the callback function handling the event, if -1 then the callback will be created
     * @returns {Number} id of the callback function handling the event
     */
    function removeFromCartHandler(target, itemAmountElement, price, id) {
        var eventName = 'onclick';
        if (id === -1) {
            id = eventBus.subscribe(eventName, function (data) {
                var totalBill = parseInt(totalBillEl.value),
                    itemAmount = parseInt(data.amount.value);
                if (itemAmount > 0) {
                    data.amount.value = itemAmount - 1;
                    totalBillEl.value = totalBill - data.price;
                }
            });
        }
        target[eventName] = function () {
            eventBus.publish(eventName, id, {'amount': itemAmountElement, 'price': price});
        }
        return id;
    }

    /**
     * Returns a child element having given class name, contained inside specified parent element.
     * @param {Element} parentElement parent element to search in
     * @param {String} className class name of the child element
     * @returns {Element} found child element
     */
    function getByClassName(parentElement, className) {
        return parentElement.querySelector('.' + className);
    }
    /**
     * Creates add and remove buttons.
     * @param {Element} tr a reference to a row of the items table, where buttons should be created
     * @param {Number} addHandlerID ID of the callback handling add event, if -1 then a new callback will be created
     * @param {Number} removeHandlerID ID of the callback handling remove event, if -1 then a new callback will be created
     * @returns {Object} an object holding IDes of the callbacks handling add and remove events
     */
    function createAddRemoveBtns(tr, addHandlerID, removeHandlerID) {
        var parentEl, itemAmountEl, cartBtn,
            price = parseInt(getByClassName(tr, CLASS_NAMES.itemPrice).innerText);
        parentEl = appendChild(tr, 'td');
        parentEl = appendChild(parentEl, 'span', {'className': CLASS_NAMES.itemAmountController});
        itemAmountEl = appendChild(parentEl, 'input', {'className': CLASS_NAMES.itemAmount, 'value': '0', 'disabled': 'true'});
        cartBtn = appendChild(parentEl, 'span', {'className': CLASS_NAMES.addItemBtn, 'innerText': 'Add'});
        addHandlerID = addToCartHandler(cartBtn, itemAmountEl, price, addHandlerID);
        cartBtn = appendChild(parentEl, 'span', {'className': CLASS_NAMES.removeItemBtn, 'innerText': 'Remove'});
        removeHandlerID = removeFromCartHandler(cartBtn, itemAmountEl, price, removeHandlerID);
        return {'addHandlerID': addHandlerID, 'removeHandlerID': removeHandlerID};
    }

    /**
     * Creates page button click callback and subscribes it to event bus.
     * @param {Element} element button element
     */
    function pageBtnHandler(element) {
        var id = 0,
            eventName = 'myevent';
        id = eventBus.subscribe(eventName, function (e) {
            var data = JSON.parse(e.dataset.paging);
            getByClassName(paginationEl, CLASS_NAMES.curPageBtn).classList.remove(CLASS_NAMES.curPageBtn);
            loadItems(data.start, data.end);
            e.classList.add(CLASS_NAMES.curPageBtn);
        });
        element.addEventListener(eventName, function (e) {
            eventBus.publish(eventName, id, this);
        }, false);
        element.onclick = function () {
            element.dispatchEvent(new CustomEvent(eventName, { 'detail': {} }));
        }
    }
})();
