/**
 * Created by mariao on 7/6/15.
 */

var view = (function() {
    var ITEM_AMOUNT_CONTAINER = 'item-amount',
        ITEM_AMOUNT_INPUT = 'amount',
        ITEM_AMOUNT_ADD_BTN = 'add',
        ITEM_AMOUNT_REMOVE_BTN = 'remove',
        SORT_ASC_BTN = 'sort-asc-btn',
        SORT_DESC_BTN = 'sort-desc-btn',
        ITEM_PRICE_CELL = 'price',
        TABLE_BODY_CELL = 'td',
        TABLE_HEADER_CELL = 'th',
        TABLE_ROW = 'tr',
        itemElements = [];

    /**
     * Creates head of the items table.
     */
    function loadItemsTableHeaders(headers) {
        var row, headFragment, headerNmb;
        row = document.createElement('div');
        row.classList.add(TABLE_ROW);
        for (headerNmb = 0; headerNmb < headers.length; headerNmb++) {
            row = appendItemsTableHeader(row, headers[headerNmb]);
        }
        helpers.appendChild(row, 'div', {'innerText': 'cart', 'className': TABLE_HEADER_CELL});
        elements.itemsTableHead.appendChild(row);
        headFragment = document.createDocumentFragment();
        headFragment.appendChild(elements.itemsTableHead);
        elements.itemsTable.appendChild(headFragment);
    }

    function init(data) {
        eventBus.subscribe(events.pageBtnClicked, function (data) {
            loadItems(data.start, data.end);
        });
        eventBus.subscribe(events.itemsPerPageChanged, function (itemsAmount) {
            var firstIndex, newCurPage, topRowIndex;
            topRowIndex = parseInt(helpers.getByClassName(elements.itemsTableBody, TABLE_ROW + ':first-child').dataset.index, 10);
            newCurPage = Math.floor(topRowIndex / itemsAmount) + 1;
            firstIndex = (newCurPage - 1) * itemsAmount;
            loadItems(firstIndex, firstIndex + itemsAmount);
            eventBus.publish(events.curPageChanged, newCurPage);
        });
        eventBus.subscribe(events.resetCart, function () {
            itemElements.forEach(function(itemElement) {
                helpers.getByClassName(itemElement, ITEM_AMOUNT_INPUT).value = 0;
            });
            elements.totalBill.value = 0;
        });
        loadItemsTableHeaders(data.headers);
        createItemElements(data.items, data.headers);
        loadItems(0, 10);
    }

    /**
     * Creates all the item elements including add and remove buttons.
     */
    function createItemElements(items, headers) {
        var i, j, row, cell, className = '';
        for (i = 0; i < items.length; i++) {
            row = document.createElement('div');
            row.classList.add(TABLE_ROW);
            row.dataset.index = i;
            for (j = 0; j < headers.length; j++) {
                className = headers[j] + ' ' + TABLE_BODY_CELL;
                cell = helpers.appendChild(row, 'div', {'className': className});
                if (headers[j] === 'image') {
                    helpers.appendChild(cell, 'img', {'src': items[i][headers[j]], 'alt': 'image'});
                }
                else {
                    cell.innerText = items[i][headers[j]];
                }
            }
            createAddRemoveBtns(row);
            itemElements.push(row);
        }
    }

    /**
     * Loads items with indexes [firstIndex (including), lastIndex (excluding)) to the body of the items table.
     * @param {Number} firstIndex index of the first item to be loaded
     * @param {Number} endIndex index at which to end loading
     */
    function loadItems(firstIndex, endIndex) {
        var bodyFragment = document.createDocumentFragment(), itemIndex;
        endIndex = (endIndex < data.itemsNmb) ? endIndex : itemElements.length;
        elements.itemsTableBody.innerHTML = "";
        for (itemIndex = firstIndex; itemIndex < endIndex; itemIndex++) {
            elements.itemsTableBody.appendChild(itemElements[itemIndex]);
        }
        bodyFragment.appendChild(elements.itemsTableBody);
        elements.itemsTable.appendChild(bodyFragment);
    }

    /**************************************************************************************************
     *                                              Helpers
     **************************************************************************************************/


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
        var sortBtn, btnAtts, eventName;
        eventName = (asc) ? events.sortAsc : events.sortDesc;
        btnAtts = (asc) ? {'innerHTML': '&uarr;', 'className': SORT_ASC_BTN}
                        : {'innerHTML': '&darr;', 'className': SORT_DESC_BTN};
        sortBtn = helpers.createCustomElement('span', btnAtts);
        eventBus.subscribe(eventName, function(data) {
            itemElements.sort(function(item1, item2) {
                var el1val = getItemElementValue(item1, data.key),
                    el2val = getItemElementValue(item2, data.key),
                    res;
                res = (el1val > el2val) ? 1 : ((el1val < el2val) ? -1 : 0);
                return (data.asc) ? res : -res;
            });
            reindexItemsElements();
            loadItems(0, parseInt(elements.itemsPerPage.value));
            eventBus.publish(events.itemsPerPageChanged, elements.itemsPerPage.value);
        });
        sortBtn.onclick = function() {
            eventBus.publish(eventName, {key: key, asc: asc});
        };
        return sortBtn;
    }

    function addItemBtnHandler(data) {
        var totalBill = parseInt(elements.totalBill.value);
        data.amount.value = parseInt(data.amount.value) + 1;
        elements.totalBill.value = totalBill + data.price;
    }

    function removeItemBtnHandler(data) {
        var totalBill = parseInt(elements.totalBill.value),
            itemAmount = parseInt(data.amount.value);
        if (itemAmount > 0) {
            data.amount.value = itemAmount - 1;
            elements.totalBill.value = totalBill - data.price;
        }
    }

    /**
     * Initializes add or remove item button.
     * @param {Element} parentElement a reference to the element containing the button
     * @param {Object} btnAtts object defining attributes of the button
     * @param {Number} itemAmountElement amount of the item added to the cart
     * @param {Number} itemPrice price of the added item\
     * @param {Function} cb a reference to the callback function handling the event
     * @param {String} eventName the name of the event
     */
    function initItemBtn(parentElement, btnAtts, itemAmountElement, itemPrice, cb, eventName) {
        var btn = helpers.appendChild(parentElement, 'button', btnAtts);
        eventBus.subscribe(eventName, cb);
        btn.onclick = function() {
            var data = {'amount': itemAmountElement, 'price': itemPrice};
            eventBus.publish(eventName, data);
        };
    }

    /**
     * Creates add and remove buttons.
     * @param {Element} tr a reference to a row of the items table, where buttons should be created
     */
    function createAddRemoveBtns(tr) {
        var container, itemAmount, price, btnAtts;
        price = parseInt(helpers.getByClassName(tr, ITEM_PRICE_CELL).innerText);
        container = helpers.appendChild(tr, 'div', {'className': TABLE_BODY_CELL});
        container = helpers.appendChild(container, 'span', {'className': ITEM_AMOUNT_CONTAINER});
        itemAmount = helpers.appendChild(container, 'input', {'className': ITEM_AMOUNT_INPUT, 'value': '0', 'disabled': 'true'});
        btnAtts = {'className': ITEM_AMOUNT_ADD_BTN, 'innerText': 'Add'};
        initItemBtn(container, btnAtts, itemAmount, price, addItemBtnHandler, events.addItem);
        btnAtts = {'className': ITEM_AMOUNT_REMOVE_BTN, 'innerText': 'Remove'};
        initItemBtn(container, btnAtts, itemAmount, price, removeItemBtnHandler, events.removeBtn);
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
                'className': TABLE_HEADER_CELL + ' ' + headerName
            };
        header = helpers.appendChild(row, 'div', headerAttributes);
        header.appendChild(sortBtn(headerName, true));
        header.appendChild(sortBtn(headerName, false));
        return row;
    }

    /**
     * Gets an item row element and a cell class name and returns value of that cell.
     * @param {Element} itemElement a reference to an item row element
     * @param {String} className class name of a cell of the item row
     * @returns {*} value of the cell with specified class name
     */
    function getItemElementValue(itemElement, className) {
        var val = helpers.getByClassName(itemElement, className).innerText;
        return (className === 'id' || className === 'price') ? parseInt(val, 10) : val;
    }

    return {
        init: init
    }
})();