/**
 * Created by mariao on 6/29/15.
 */


(function () {
    "use strict";
    /*
     * Class names of dynamically created elements
     */
    var CNAMES = {
        ITEM_AMOUNT_CONTAINER: 'item-amount',
        ITEM_AMOUNT_INPUT: 'amount',
        ITEM_AMOUNT_ADD_BTN: 'add',
        ITEM_AMOUNT_REMOVE_BTN: 'remove',
        SORT_ASC_BTN: 'sort-asc-btn',
        SORT_DESC_BTN: 'sort-desc-btn',
        ITEM_PRICE_CELL: 'price',
        PAGE_BTN: 'page-btn',
        CUR_PAGE_BTN: 'current-page-btn',
        PAGE_LINK: 'page-link',
        TABLE_BODY_CELL: 'td',
        TABLE_HEADER_CELL: 'th',
        TABLE_ROW: 'tr'
    },
        itemsTableElement = document.querySelector('.items-table'),
        itemsPerPageElement = document.querySelector('.items-per-page-input'),
        totalBillElement = document.querySelector('.total-bill'),
        paginationElement = document.querySelector('.pages-nav'),
        resetCartElement = document.querySelector('.reset-cart-btn'),
        itemsTableHeadElement = document.querySelector('.items-table .thead'),
        itemsTableBodyElement = document.querySelector('.items-table .tbody'),
        itemElements = [],
        itemAttNames = Object.keys(ITEMS[0]),
        eventBus = new PubSub();

    loadItemsTableHeaders();
    createItemElements();
    loadItems(0, parseInt(itemsPerPageElement.value));
    handleItemsPerPageElement();
    loadPaginationBar(1);
    handleResetCartButton();

    /**
     * Creates head of the items table.
     */
    function loadItemsTableHeaders() {
        var row, headFragment, itemAttNameIndex;
        row = document.createElement('div');
        row.classList.add(CNAMES.TABLE_ROW);
        for (itemAttNameIndex = 0; itemAttNameIndex < itemAttNames.length; itemAttNameIndex++) {
            row = appendItemsTableHeader(row, itemAttNames[itemAttNameIndex]);
        }
        appendChild(row, 'div', {'innerText': 'cart', 'className': CNAMES.TABLE_HEADER_CELL});
        itemsTableHeadElement.appendChild(row);
        headFragment = document.createDocumentFragment();
        headFragment.appendChild(itemsTableHeadElement);
        itemsTableElement.appendChild(headFragment);
    }


    /**
     * Creates all the item elements including add and remove buttons.
     */
    function createItemElements() {
        var itemAttIndex, itemIndex, row, cell, addHandlerID = -1, removeHandlerID = -1, cartBtnsIDs, className = '';
        for (itemIndex = 0; itemIndex < ITEMS.length; itemIndex++) {
            row = document.createElement('div');
            row.classList.add(CNAMES.TABLE_ROW);
            row.dataset.index = itemIndex;
            for (itemAttIndex = 0; itemAttIndex < itemAttNames.length; itemAttIndex++) {
                className = itemAttNames[itemAttIndex] + ' ' + CNAMES.TABLE_BODY_CELL;
                cell = appendChild(row, 'div', {'className': className});
                if (itemAttNames[itemAttIndex] === 'image') {
                    appendChild(cell, 'img', {'src': ITEMS[itemIndex][itemAttNames[itemAttIndex]], 'alt': 'image'});
                }
                else {
                    cell.innerText = ITEMS[itemIndex][itemAttNames[itemAttIndex]];
                }
            }
            cartBtnsIDs = createAddRemoveBtns(row, addHandlerID, removeHandlerID);
            addHandlerID = cartBtnsIDs.addHandlerID;
            removeHandlerID = cartBtnsIDs.removeHandlerID;
            itemElements.push(row);
        }
    }

    /**
     * Loads items with indexes [firstIndex (including), lastIndex (excluding)) to the body of the items table.
     * @param {Number} firstIndex index of the first item to be loaded
     * @param {Number} endIndex index at which to end loading
     */
    function loadItems(firstIndex, endIndex) {
        var bodyFragment = document.createDocumentFragment(), itemIndex = 0;
        endIndex = (endIndex < ITEMS.length) ? endIndex : ITEMS.length;
        itemsTableBodyElement.innerHTML = "";
        for (itemIndex = firstIndex; itemIndex < endIndex; itemIndex++) {
            itemsTableBodyElement.appendChild(itemElements[itemIndex]);
        }
        bodyFragment.appendChild(itemsTableBodyElement);
        itemsTableElement.appendChild(bodyFragment);
    }

    /**
     * Creates items per page change event listener and subscribes it to the event bus.
     */
    function handleItemsPerPageElement() {
        var eventName = 'onchange', callbackID, firstIndex, newCurPage, topRowIndex;
        callbackID = eventBus.subscribe(eventName, function (itemsAmount) {
            topRowIndex = parseInt(getByClassName(itemsTableBodyElement, CNAMES.TABLE_ROW + ':first-child').dataset.index);
            newCurPage = Math.floor(topRowIndex / itemsAmount) + 1;
            firstIndex = (newCurPage - 1) * itemsAmount;
            loadItems(firstIndex, firstIndex + itemsAmount);
            loadPaginationBar(newCurPage);
        });
        itemsPerPageElement[eventName] = function () {
            eventBus.publish(eventName, callbackID, parseInt(this.value));
        }
    }

    /**
     * Initializes pagination bar.
     * @param {Number} curPage number of displayed page
     */
    function loadPaginationBar(curPage) {
        var pagingFragment = document.createDocumentFragment(),
            pageNmb,
            itemsPerPageNmb = (itemsPerPageElement.value < ITEMS.length) ? itemsPerPageElement.value : ITEMS.length,
            btn;
        paginationElement.innerHTML = "";
        for (pageNmb = 1; (pageNmb - 1) * itemsPerPageNmb < ITEMS.length; pageNmb++) {
            btn = createPaginationBtnElement(pageNmb == curPage, pageNmb, itemsPerPageNmb);
            pagingFragment.appendChild(btn);
            pageBtnHandler(btn);
        }
        paginationElement.appendChild(pagingFragment);
    }

    /**
     * Creates a listener for reset cart event and subscribes it to the event bus.
     */
    function handleResetCartButton() {
        var callbackID = 0,
            eventName = 'onclick';
        callbackID = eventBus.subscribe(eventName, function () {
            itemElements.forEach(function(itemElement) {
                getByClassName(itemElement, CNAMES.ITEM_AMOUNT_INPUT).value = 0;
            });
            totalBillElement.value = 0;
        });
        resetCartElement[eventName] = function () {
            eventBus.publish(eventName, callbackID, {});
        };
    }


    /**************************************************************************************************
     *                                              Helpers
     **************************************************************************************************/
    /**
     * Creates a new DOM element and appends it to the specified parent element.
     * @param {Element} parentElement parent element of the newly created element
     * @param {String} childTagName tag name of the child element
     * @param {Object} childAtts attributes of the child element in the form {name: value, name: value ...}
     * @returns {Element} the newly created element
     */
    function appendChild(parentElement, childTagName, childAtts) {
        var attributeName, datasetKey = '', childElement;
        childElement = createCustomElement(childTagName, childAtts);
        parentElement.appendChild(childElement);
        return childElement;
    }

    /**
     * Reindexes item DOM elements
     * @returns {Array} reindexed elements
     */
    function reindexItemsElements() {
        var itemIndex;
        for (itemIndex = 0; itemIndex < itemElements.length; itemIndex++) {
            itemElements[itemIndex].dataset.index = itemIndex;
        }
        return itemElements;
    }

    /**
     * Creates sort button and its click handler
     * @param key sorting property
     * @param asc if true then uses ascending order, otherwise - descending
     * @returns {Element} created button
     */
    function sortBtn(key, asc) {
        var sortBtn, btnAtts, eventName = 'onclick', callbackID;
        btnAtts = (asc) ? {'innerHTML': '&uarr;', 'className': CNAMES.SORT_ASC_BTN}
                        : {'innerHTML': '&darr;', 'className': CNAMES.SORT_DESC_BTN};
        sortBtn = createCustomElement('span', btnAtts);
        callbackID = eventBus.subscribe(eventName, function() {
            itemElements.sort(function(item1, item2) {
                var el1val = getItemElementValue(item1, key),
                    el2val = getItemElementValue(item2, key),
                    res;
                res = (el1val > el2val) ? 1 : ((el1val < el2val) ? -1 : 0);
                return (asc) ? res : -res;
            });
            reindexItemsElements();
            loadItems(0, parseInt(itemsPerPageElement.value));
            loadPaginationBar(1);
        });
        sortBtn[eventName] = function() {
            eventBus.publish(eventName, callbackID, key);
        }
        return sortBtn;
    }

    function createCustomElement(tagName, attributes) {
        var element = document.createElement(tagName), attributeName, subAttributeName;
        for (attributeName in attributes) {
            if ((typeof attributes[attributeName]) === 'object') {
                for (subAttributeName in attributes[attributeName]) {
                    element[attributeName][subAttributeName] = attributes[attributeName][subAttributeName];
                }
            }
            else {
                element[attributeName] = attributes[attributeName];
            }
        }
        return element;
    }
    /**
     * Gets an item row element and a cell class name and returns value of that cell.
     * @param {Element} itemElement a reference to an item row element
     * @param {String} className class name of a cell of the item row
     * @returns {*} value of the cell with specified class name
     */
    function getItemElementValue(itemElement, className) {
        var val = getByClassName(itemElement, className).innerText;
        return (className === 'id' || className === 'price') ? parseInt(val) : val;
    }
    /**
     * Initializes add or remove item button and returns its callback id.
     * @param {Element} parentElement a reference to the element containing the button
     * @param {Object} btnAtts object defining attributes of the button
     * @param {Number} itemAmountElement amount of the item added to the cart
     * @param {Number} itemPrice price of the added item
     * @param {Number} handlerID id of the callback function handling the event, if -1 then the callback will be created
     * @param {Function} handler the callback function handling the event
     * @returns {Number} id of the callback function handling the event
     */
    function initItemBtn(parentElement, btnAtts, itemAmountElement, itemPrice, handlerID, handler) {
        var eventName = 'onclick',
            btn = appendChild(parentElement, 'button', btnAtts);
        if (handlerID === -1) {
            handlerID = eventBus.subscribe(eventName, handler);
        }
        btn[eventName] = function() {
            var data = {'amount': itemAmountElement, 'price': itemPrice};
            eventBus.publish(eventName, handlerID, data);
        }
        return handlerID;
    }


    function addToCartHandler(data) {
        var totalBill = parseInt(totalBillElement.value);
        data.amount.value = parseInt(data.amount.value) + 1;
        totalBillElement.value = totalBill + data.price;
    }

    function removeFromCartHandler(data) {
        var totalBill = parseInt(totalBillElement.value),
            itemAmount = parseInt(data.amount.value);
        if (itemAmount > 0) {
            data.amount.value = itemAmount - 1;
            totalBillElement.value = totalBill - data.price;
        }
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
     * @param {Number} addCbID ID of the callback handling add event, if -1 then a new callback will be created
     * @param {Number} removeCbID ID of the callback handling remove event, if -1 then a new callback will be created
     * @returns {Object} an object holding IDes of the callbacks handling add and remove events
     */
    function createAddRemoveBtns(tr, addCbID, removeCbID) {
        var container, itemAmount, btn, price, btnAtts;
        price = parseInt(getByClassName(tr, CNAMES.ITEM_PRICE_CELL).innerText);
        container = appendChild(tr, 'div', {'className': CNAMES.TABLE_BODY_CELL});

        container = appendChild(container, 'span', {'className': CNAMES.ITEM_AMOUNT_CONTAINER});

        itemAmount = appendChild(container, 'input', {'className': CNAMES.ITEM_AMOUNT_INPUT, 'value': '0', 'disabled': 'true'});

        btnAtts = {'className': CNAMES.ITEM_AMOUNT_ADD_BTN, 'innerText': 'Add'};
        addCbID = initItemBtn(container, btnAtts, itemAmount, price, addCbID, addToCartHandler);

        btnAtts = {'className': CNAMES.ITEM_AMOUNT_REMOVE_BTN, 'innerText': 'Remove'};
        removeCbID = initItemBtn(container, btnAtts, itemAmount, price, removeCbID, removeFromCartHandler);

        return {'addHandlerID': addCbID, 'removeHandlerID': removeCbID};
    }

    /**
     * Creates page button click callback and subscribes it to event bus.
     * @param {Element} pageBtnElement button element
     */
    function pageBtnHandler(pageBtnElement) {
        var cbID = 0,
            eventName = 'myevent';
        cbID = eventBus.subscribe(eventName, function (e) {
            var data = JSON.parse(e.dataset.paging);
            getByClassName(paginationElement, CNAMES.CUR_PAGE_BTN).classList.remove(CNAMES.CUR_PAGE_BTN);
            loadItems(data.start, data.end);
            e.classList.add(CNAMES.CUR_PAGE_BTN);
        });
        pageBtnElement.addEventListener(eventName, function (e) {
            eventBus.publish(eventName, cbID, this);
        }, false);
        pageBtnElement.onclick = function () {
            pageBtnElement.dispatchEvent(new CustomEvent(eventName));
        }
    }

    /**
     * Appends a table header to the given row.
     * @param row a table row to append the newly created header to
     * @param headerName the name of the header
     * @returns {Element} updated table row
     */
    function appendItemsTableHeader(row, headerName) {
        var header,
            headerAttributes =  {
            'innerText': headerName,
            'className': CNAMES.TABLE_HEADER_CELL + ' ' + headerName
            };
        header = appendChild(row, 'div', headerAttributes);
        header.appendChild(sortBtn(headerName, true));
        header.appendChild(sortBtn(headerName, false));
        return row;
    }

    function createPaginationBtnElement(isCurPage, pageNmb, itemsPerPageNmb) {
        var firstItemIndex = (pageNmb - 1) * itemsPerPageNmb,
            endItemIndex = pageNmb * itemsPerPageNmb,
            pageItemAtts, className, btn;
        className = (isCurPage) ? (CNAMES.CUR_PAGE_BTN + ' ' + CNAMES.PAGE_BTN) : CNAMES.PAGE_BTN;
        pageItemAtts = {
            'className': className,
            'dataset': { 'paging': '{"start": ' + firstItemIndex + ', "end": ' + endItemIndex + '}' }
        };
        btn = createCustomElement('li', pageItemAtts);
        appendChild(btn, 'span', {'className': CNAMES.PAGE_LINK, 'innerText': pageNmb});
        return btn;
    }
})();
