/**
 * Created by mariao on 7/6/15.
 */

/*
 * Loads catalogue module into the app
 */
(function(app) {
    var sortAscBtnClass = 'sort-asc-btn',
        sortDescBtnClass = 'sort-desc-btn',

        eventBus = app.eventBus,

        tableElement = document.querySelector('.catalog'),

        itemRowElements = [];

    /**
     * Creates item row elements, initializes the table and subscribes event handlers to the event bus.
     * @param {Array} items item objects
     */
    function init(items, itemKeys) {
        var headers = itemKeys.concat('cart');
        itemRowElements = helpers.createRowElements(items, headers, appendContent);
        helpers.loadTableHead(tableElement, headers, appendSortBtn);
        subscribeCatalogEventHandlers();
    }

    /**
     * Loads items with indices [firstIndex, endIndex - 1] to the table.
     * @param {Number} firstIndex index of the first item row element to be loaded
     * @param {Number} endIndex index at which to end loading
     */
    function loadItems(firstIndex, endIndex) {
        helpers.loadRows(tableElement, itemRowElements, firstIndex, endIndex);
    }

    /**
     * Subscribes catalogue event handlers to the event bus.
     */
    function subscribeCatalogEventHandlers() {
        eventBus.subscribe(eventBus.eventNames.pageBtnClicked, function (data) {
            loadItems(data.start, data.end);
        });

        eventBus.subscribe(eventBus.eventNames.pagingSizeChanged, function (pagingSize) {
            var firstIndex, newCurPage, topRow, topRowIndex;
            topRow = helpers.getFirstBodyRow(tableElement);
            topRowIndex = parseInt(topRow.dataset.index, 10);
            newCurPage = Math.floor(topRowIndex / pagingSize) + 1;
            firstIndex = (newCurPage - 1) * pagingSize;
            loadItems(firstIndex, firstIndex + pagingSize);
            eventBus.publish(eventBus.eventNames.curPageChanged, newCurPage);
        });

        eventBus.subscribe(eventBus.eventNames.reloadItems, function(itemsAmount) {
            loadItems(0, itemsAmount);
        });

        subscribeSortBtnClickHandler(true);
        subscribeSortBtnClickHandler(false);
    }

    /**************************************************************************************************
     *                                              Helpers
     **************************************************************************************************/
    /**
     * Appends a sort button to a given element.
     * @param {Element} parentElement a parent element to append the button to
     * @param {String} key sorting property
     * @param {Boolean} asc sorting order, if true then ascending, otherwise - descending
     */
    function appendSortBtn(parentElement, key, asc) {
        var sortBtn, btnAtts, eventName;
        if (key !== 'image' && key !== 'cart') {
            eventName = (asc) ? eventBus.eventNames.sortAscBtnClicked : eventBus.eventNames.sortDescBtnClicked;
            btnAtts = (asc) ? {'innerHTML': '&uarr;', 'className': sortAscBtnClass}
                            : {'innerHTML': '&darr;', 'className': sortDescBtnClass};
            sortBtn = helpers.createCustomElement('span', btnAtts);
            sortBtn.onclick = function () {
                eventBus.publish(eventName, {key: key, asc: asc});
            };
            parentElement.appendChild(sortBtn);
        }
    }

    /**
     * Reindexes item DOM elements
     * @returns {Array} reindexed elements
     */
    function reindexRowElements() {
        var itemIndex;
        for (itemIndex = 0; itemIndex < itemRowElements.length; itemIndex++) {
            itemRowElements[itemIndex].dataset.index = itemIndex;
        }
        return itemRowElements;
    }

    /**
     * Appends a content to the given cell.
     * @param {String} cellClass class name of the cell to append content to
     * @param {Object} item an item corresponding to this cell
     * @param {Element} cell an element corresponding to that item
     */
    function appendContent(cellClass, item, cell) {
        switch (cellClass) {
            case 'image':
                helpers.appendChild(cell, 'img', {'src': item[cellClass], 'alt': 'image'});
                break;
            case 'cart':
                quantityButtons.appendQuantityBtns(cell, item);
                break;
            default :
                cell.innerText = item[cellClass];
        }
    }

    /**
     * Subscribes a function handling sort button click event to the event bus.
     * @param {Boolean} asc sorting order, if true then ascending, otherwise - descending
     */
    function subscribeSortBtnClickHandler(asc) {
        var eventName = (asc) ? eventBus.eventNames.sortAscBtnClicked : eventBus.eventNames.sortDescBtnClicked;
        eventBus.subscribe(eventName, function(data) {
            itemRowElements.sort(function(item1, item2) {
                var el1val = helpers.getElementValueByClassName(item1, data.key),
                    el2val = helpers.getElementValueByClassName(item2, data.key),
                    res;
                res = (el1val > el2val) ? 1 : ((el1val < el2val) ? -1 : 0);
                return (data.asc) ? res : -res;
            });
            reindexRowElements();
            eventBus.publish(eventBus.eventNames.reloadPagination, {});
        });
    }

    app.catalog = {
        init: init,
        loadRows: loadItems
    };
}(app));