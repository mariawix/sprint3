/**
 * Created by mariao on 7/6/15.
 */

/*
 * Loads view module into the app
 */
(function(app) {
    var SORT_ASC_BTN = 'sort-asc-btn',
        SORT_DESC_BTN = 'sort-desc-btn',
        TABLE_BODY_CELL = 'td',
        TABLE_HEADER_CELL = 'th',
        ITEM_ROW = 'tr',

        itemsTable = document.querySelector('.items-table'),
        itemsTableHead = document.querySelector('.items-table .thead'),
        itemsTableBody = document.querySelector('.items-table .tbody'),

        itemElements = [],
        headers = [];          // array of visible item attributes

    /**
     * Creates item row elements, initializes the table and subscribes event handlers to event bus.
     * @param {Array} items item objects
     * @param {Object} eventBus events manager
     */
    function init(items, eventBus) {
        headers = Object.keys(items[0]);
        createItemElements(items, eventBus);
        loadTableHead(eventBus);
        createEventHandlers(eventBus);
    }


    /**
     * Creates all item elements.
     * @param {Array} items array of items
     * @param {Object} eventBus events manager
     */
    function createItemElements(items, eventBus) {
        var i, row, cartBtnsCell, cartBtnsHelpers = cartButtons();
        for (i = 0; i < items.length; i++) {
            row = helpers.createCustomElement('div', {'className': ITEM_ROW, 'dataset': {'index': i}});
            headers.forEach(function(header) {
                var className = header + ' ' + TABLE_BODY_CELL,
                    cell = helpers.appendChild(row, 'div', {'className': className});
                if (header === 'image') {
                    helpers.appendChild(cell, 'img', {'src': items[i][header], 'alt': 'image'});
                }
                else {
                    cell.innerText = items[i][header];
                }
            });
            cartBtnsCell = helpers.appendChild(row, 'div', {'className': TABLE_BODY_CELL});
            cartBtnsHelpers.appendCartBtns(cartBtnsCell, items[i], eventBus);
            itemElements.push(row);
        }
    }

    /**
     * Loads header cells to the head of the table.
     * @param {Object} eventBus events manager
     */
    function loadTableHead(eventBus) {
        var row, headFragment;
        row = helpers.createCustomElement('div', {'className': ITEM_ROW});
        headers.forEach(function(header) {
            appendHeaderCell(row, header, eventBus);
        });
        helpers.appendChild(row, 'div', {'innerText': 'cart', 'className': TABLE_HEADER_CELL});
        itemsTableHead.appendChild(row);
        headFragment = document.createDocumentFragment();
        headFragment.appendChild(itemsTableHead);
        itemsTable.appendChild(headFragment);
    }

    /**
     * Loads items with indices [firstIndex, endIndex - 1] to the table.
     * @param {Number} firstIndex index of the first item element to be loaded
     * @param {Number} endIndex index at which to end loading
     */
    function loadItems(firstIndex, endIndex) {
        var bodyFragment = document.createDocumentFragment(), itemIndex;
        endIndex = (endIndex < itemElements.length) ? endIndex : itemElements.length;
        itemsTableBody.innerHTML = "";
        for (itemIndex = firstIndex; itemIndex < endIndex; itemIndex++) {
            itemsTableBody.appendChild(itemElements[itemIndex]);
        }
        bodyFragment.appendChild(itemsTableBody);
        itemsTable.appendChild(bodyFragment);
    }

    /**
     *
     * @param {Object} eventBus events manager
     */
    function createEventHandlers(eventBus) {
        eventBus.subscribe(events.pageBtnClicked, function (data) {
            loadItems(data.start, data.end);
        });

        eventBus.subscribe(events.itemsPerPageChanged, function (itemsAmount) {
            var firstIndex, newCurPage, topRow, topRowIndex;
            topRow = helpers.getByClassName(itemsTableBody, ITEM_ROW + ':first-child');
            topRowIndex = parseInt(topRow.dataset.index, 10);
            newCurPage = Math.floor(topRowIndex / itemsAmount) + 1;
            firstIndex = (newCurPage - 1) * itemsAmount;
            loadItems(firstIndex, firstIndex + itemsAmount);
            eventBus.publish(events.curPageChanged, newCurPage);
        });

        eventBus.subscribe(events.refreshView, function(itemsAmount) {
            loadItems(0, itemsAmount);
        });
    }


    /**************************************************************************************************
     *                                              Helpers
     **************************************************************************************************/

    /**
     * Appends a header cell to the given row.
     * @param row a table row to append the newly created header to
     * @param headerName the name of the header
     */
    function appendHeaderCell(row, headerName, eventBus) {
        var header,
            headerAttributes =  {
                'innerText': headerName,
                'className': TABLE_HEADER_CELL + ' ' + headerName
            };
        header = helpers.appendChild(row, 'div', headerAttributes);
        header.appendChild(sortBtn(headerName, true, eventBus));
        header.appendChild(sortBtn(headerName, false, eventBus));
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
     * @param eventBus
     * @returns {Element} created button
     */
    function sortBtn(key, asc, eventBus) {
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
            eventBus.publish(events.refreshPaging, {});
        });
        sortBtn.onclick = function() {
            eventBus.publish(eventName, {key: key, asc: asc});
        };
        return sortBtn;
    }


    /**
     * Gets an item row element and a cell class name and returns value of that cell.
     * @param {Element} itemElement a reference to an item row element
     * @param {String} className class name of a cell of the item row
     * @returns {*} value of the cell with specified class name
     */
    function getItemElementValue(itemElement, className) {
        var val = helpers.getByClassName(itemElement, className).innerText, valNmb;
        valNmb = parseInt(val, 10);
        return (isNaN(valNmb)) ? val : valNmb;
    }

    app.view = {
        init: init,
        loadItems: loadItems
    };
})(app);