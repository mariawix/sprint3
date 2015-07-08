/**
 * Created by mariao on 7/6/15.
 */

/*
 * Loads catalog module into the app
 */
(function(app) {
    var sortAscBtnClass = 'sort-asc-btn',
        sortDescBtnClass = 'sort-desc-btn',
        tableBodyCellClass = 'td',
        tableHeaderCellClass = 'th',
        tableRowClass = 'tr',

        itemsTable = document.querySelector('.items-table'),
        itemsTableHead = document.querySelector('.items-table .thead'),
        itemsTableBody = document.querySelector('.items-table .tbody'),

        itemElements = [],
        itemKeys = [];

    /**
     * Creates item row elements, initializes the table and subscribes event handlers to event bus.
     * @param {Array} items item objects
     * @param {Object} eventBus events manager
     */
    function init(items, eventBus) {
        itemKeys = Object.keys(items[0]);
        createItemRowElements(items, eventBus);
        loadTableHead(eventBus);
        subscribeEventHandlers(eventBus);
    }

    /**
     * Creates all item row elements.
     * @param {Array} items array of items
     * @param {Object} eventBus events manager
     */
    function createItemRowElements(items, eventBus) {
        var i, itemRowElement, cartBtnsCell, cartBtnsHelpers = cartButtons();
        for (i = 0; i < items.length; i++) {
            itemRowElement = createItemRowElement(items[i], i);
            cartBtnsCell = helpers.appendChild(itemRowElement, 'div', {'className': tableBodyCellClass});
            cartBtnsHelpers.appendCartBtns(cartBtnsCell, items[i], eventBus);
            itemElements.push(itemRowElement);
        }
    }

    /**
     * Loads header cells to the head of the table.
     * @param {Object} eventBus app event manager
     */
    function loadTableHead(eventBus) {
        var row, headFragment;
        row = helpers.createCustomElement('div', {'className': tableRowClass});
        itemKeys.forEach(function(header) {
            appendHeaderCell(row, header, eventBus);
        });
        helpers.appendChild(row, 'div', {'innerText': 'cart', 'className': tableHeaderCellClass});
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
     * Subscribes view event handlers to the event bus.
     * @param {Object} eventBus app events manager
     */
    function subscribeEventHandlers(eventBus) {
        eventBus.subscribe(eventBus.pageBtnClicked, function (data) {
            loadItems(data.start, data.end);
        });

        eventBus.subscribe(eventBus.pagingSizeChanged, function (pagingSize) {
            var firstIndex, newCurPage, topRow, topRowIndex;
            topRow = helpers.getByClassName(itemsTableBody, tableRowClass + ':first-child');
            topRowIndex = parseInt(topRow.dataset.index, 10);
            newCurPage = Math.floor(topRowIndex / pagingSize) + 1;
            firstIndex = (newCurPage - 1) * pagingSize;
            loadItems(firstIndex, firstIndex + pagingSize);
            eventBus.publish(eventBus.curPageChanged, newCurPage);
        });

        eventBus.subscribe(eventBus.refreshViewEvent, function(itemsAmount) {
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
     * @param {Object} eventBus app event manager
     */
    function appendHeaderCell(row, headerName, eventBus) {
        var header,
            headerAttributes =  {
                'innerText': headerName,
                'className': tableHeaderCellClass + ' ' + headerName
            };
        header = helpers.appendChild(row, 'div', headerAttributes);
        header.appendChild(sortBtn(headerName, true, eventBus));
        header.appendChild(sortBtn(headerName, false, eventBus));
    }

    /**
     * Converts given item data object into an item row element.
     * @param {Object} item item data
     * @param {Number} index index of the item
     * @returns {Element} the newly created element
     */
    function createItemRowElement(item, index) {
        var itemRowElement = helpers.createCustomElement('div', {'className': tableRowClass, 'dataset': {'index': index}});
        itemKeys.forEach(function(key) {
            var className = key + ' ' + tableBodyCellClass,
                cell = helpers.appendChild(itemRowElement, 'div', {'className': className});
            if (key === 'image') {
                helpers.appendChild(cell, 'img', {'src': item[key], 'alt': 'image'});
            }
            else {
                cell.innerText = item[key];
            }
        });
        return itemRowElement;
    }

    /**
     * Reindexes item DOM elements
     * @returns {Array} reindexed elements
     */
    function reindexItemRowElements() {
        var itemIndex;
        for (itemIndex = 0; itemIndex < itemElements.length; itemIndex++) {
            itemElements[itemIndex].dataset.index = itemIndex;
        }
        return itemElements;
    }

    /**
     * Creates sort button and subscribes its handler to the event bus.
     * @param {String} key sorting property
     * @param {Boolean} asc if true then uses ascending order, otherwise - descending
     * @param {Object} eventBus app event manager
     * @returns {Element} created button
     */
    function sortBtn(key, asc, eventBus) {
        var sortBtn, btnAtts, eventName;

        eventName = (asc) ? eventBus.sortAscBtnClicked : eventBus.sortDescBtnClicked;
        btnAtts = (asc) ? {'innerHTML': '&uarr;', 'className': sortAscBtnClass}
                        : {'innerHTML': '&darr;', 'className': sortDescBtnClass};
        sortBtn = helpers.createCustomElement('span', btnAtts);
        eventBus.subscribe(eventName, function(data) {
            itemElements.sort(function(item1, item2) {
                var el1val = getItemRowElementValue(item1, data.key),
                    el2val = getItemRowElementValue(item2, data.key),
                    res;
                res = (el1val > el2val) ? 1 : ((el1val < el2val) ? -1 : 0);
                return (data.asc) ? res : -res;
            });
            reindexItemRowElements();
            eventBus.publish(eventBus.refreshPagingEvent, {});
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
    function getItemRowElementValue(itemElement, className) {
        var val = helpers.getByClassName(itemElement, className).innerText, valNmb;
        valNmb = parseInt(val, 10);
        return (isNaN(valNmb)) ? val : valNmb;
    }

    app.view = {
        init: init,
        loadItems: loadItems
    };
})(app);