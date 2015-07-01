/**
 * Created by mariao on 6/29/15.
 */


(function () {
    var itemsTable = document.querySelector('.items-table'),     // items table
        itemsNmbEl = document.querySelector('.pages-nmb-input'), // DOM element holding number of items per page
        paginationEl = document.querySelector('.pagination'),    // pagination bar
        tbody = undefined,          // body of the items table
        itemElements = [],          // items elements
        theaders = [],              // headers of the items table
        eventBus = new PubSub();    // events manager

    /**
     * Creates a new DOM element and appends it to the specified parent element.
     * Returns the newly created element.
     * @param {DOMElement} parentElement parent element of the newly created element
     * @param {String} childName tag name of the child element
     * @param {Object} childAtts attributes of the child element in the form {name: value, name: value ...}
     * @returns the newly created element
     */
    function appendChild(parentElement, childName, childAtts) {
        var key = '',
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
     * Creates head of the items table using properties of an ITEMS object.
     */
    function loadHeaders() {
        var thead = document.createElement('thead'),
            tr = document.createElement('tr'),
            fragment = document.createDocumentFragment(),
            key = {};
        for (key in ITEMS[0]) {
            theaders.push(key);
            appendChild(tr, 'th', {'innerHTML': key});
        }
        appendChild(tr, 'th', {'innerHTML': 'cart'});
        thead.appendChild(tr);
        fragment.appendChild(thead);
        itemsTable.appendChild(fragment);
    }

    /**
     * Creates an event listener for "add" button click and subscribes it to the event bus.
     * @param {DOMElement} target a reference to the object that dispatched the event
     * @param {Number} itemAmountElement number of items per page
     * @param {Number} price price of the added item
     * @param {DOMElement} cartElement a reference to the total bill element
     */
    function addToCartHandler(target, itemAmountElement, price, cartElement) {
        var id = 0,
            eventName = 'onclick',
            totalBill = 0;
        var id = eventBus.subscribe(eventName, function () {
            totalBill = parseInt(cartElement.value);
            itemAmountElement.value = parseInt(itemAmountElement.value) + 1;
            cartElement.value = totalBill + price;
        });
        target[eventName] = function () {
            eventBus.publish(eventName, id);
        }
    }

    /**
     * Creates an event listener for "remove" button click and subscribes it to the event bus.
     * @param {DOMElement} target a reference to the object that dispatched the event
     * @param {Number} itemAmountElement number of items per page
     * @param {Number} price price of the added item
     * @param {DOMElement} cartElement a reference to the total bill element
     */
    function removeFromCartHandler(target, itemAmountElement, price, cartElement) {
        var id = 0,
            eventName = 'onclick',
            totalBill = 0,
            itemsAmount = 0;
        var id = eventBus.subscribe(eventName, function () {
            totalBill = parseInt(cartElement.value);
            itemsAmount = parseInt(itemAmountElement.value);
            if (itemsAmount > 0) {
                itemAmountElement.value = itemsAmount - 1;
                cartElement.value = totalBill - price;
            }
        });
        target[eventName] = function () {
            eventBus.publish(eventName, id);
        }
    }

    /**
     * Creates add and remove.
     * @param {DOMElement} tr a reference to a row of the items table, where buttons should be created
     * @returns the row
     */
    function createAddRemoveBtns(tr) {
        var cart = document.querySelector('.items-cart-bill'),
            element = {},
            pagesAmountEl = {},
            cartBtn = {},
            price = 0;
        price = parseInt(tr.querySelector('.price').innerHTML);
        element = appendChild(tr, 'td');
        element = appendChild(element, 'span', {'className': 'item-amount'});
        pagesAmountEl = appendChild(element, 'input', {'className': 'amount', 'value': '0', 'disabled': 'true'});
        cartBtn = appendChild(element, 'a', {'className': 'add', 'href': '#', 'innerHTML': 'Add'});
        addToCartHandler(cartBtn, pagesAmountEl, price, cart);
        cartBtn = appendChild(element, 'a', {'className': 'remove', 'href': '#', 'innerHTML': 'Remove'});
        removeFromCartHandler(cartBtn, pagesAmountEl, price, cart);
        return tr;
    }

    /**
     * Creates all the items elements including add and remove buttons.
     */
    function createItemElements() {
        var j = 0,
            i = 0,
            tr = {};
        for (j = 0; j < ITEMS.length; j++) {
            tr = document.createElement('tr');
            tr.dataset.index = j;
            for (i = 0; i < theaders.length; i++) {
                appendChild(tr, 'td', {'innerHTML': ITEMS[j][theaders[i]], 'className': theaders[i]});
            }
            tr = createAddRemoveBtns(tr);
            itemElements.push(tr);
        }
    }

    /**
     * Loads items with indexes [firstIndex (including), lastIndex (excluding)) to the table
     * @param {Number} firstIndex index of the first item to be loaded
     * @param {Number} lastIndex index at which to end loading
     */
    function loadItems(firstIndex, lastIndex) {
        var fragment = document.createDocumentFragment(),
            i = 0;
        lastIndex = (lastIndex < ITEMS.length) ? lastIndex : ITEMS.length;
        if (tbody) {
            tbody.innerHTML = "";
        }
        else {
            tbody = document.createElement('tbody');
        }
        for (i = firstIndex; i < lastIndex; i++) {
            tbody.appendChild(itemElements[i]);
        }
        fragment.appendChild(tbody);
        itemsTable.appendChild(fragment);
    }

    /**
     * Creates items per page change event listener and subscribes it to the event bus.
     */
    function createItemsAmountInputHandler() {
        var eventName = 'onchange',
            id = 0,
            firstItem = 0,
            skippedPages = 0,
            topRow = 0;
        id = eventBus.subscribe(eventName, function (pagesAmount) {
            topRow = parseInt(tbody.querySelector('tr:first-child').dataset.index);
            skippedPages = Math.floor(topRow/pagesAmount);
            firstItem = topRow - skippedPages * pagesAmount;
            console.log('first index: ' + firstItem);
            loadItems(firstItem, firstItem + pagesAmount);
            loadPaginationBar(skippedPages + 1);
        });
        itemsNmbEl[eventName] = function () {
            eventBus.publish(eventName, id, this.value);
        }
    }

    /**
     * Creates page button click callback, subscribes it to event bus.
     * @param element button element
     */
    function pageBtnHandler(element) {
        var id = 0,
            eventName = 'myevent';
        id = eventBus.subscribe(eventName, function (e) {
            var data = JSON.parse(e.dataset.paging);
            document.querySelector('.current-page-btn').className = 'pagination-btn';
            loadItems(data.start, data.end);
            e.className = e.className + ' current-page-btn';
        });
        element.addEventListener(eventName, function (e) {
            eventBus.publish(eventName, id, this);
        }, false);
        element.onclick = function () {
            element.dispatchEvent(new Event(eventName));
        }
    }

    /**
     * Initializes pagination bar.
     * @param {Number} curPage number of displayed page
     */
    function loadPaginationBar(curPage) {
        var fragment = document.createDocumentFragment(),
            pageNmb = 0,
            displayedItemsNmb = (itemsNmbEl.value < ITEMS.length) ? itemsNmbEl.value : ITEMS.length,
            paginationBtn = {},
            className = '';
        paginationEl.innerHTML = "";

        for (pageNmb = 1; (pageNmb - 1) * displayedItemsNmb < ITEMS.length; pageNmb++) {
            className = (pageNmb === curPage) ? 'pagination-btn current-page-btn' : 'pagination-btn';
            paginationBtn = appendChild(fragment, 'li',
                {
                    'className': className,
                    'dataset': {
                        'paging': '{"start": ' + (pageNmb - 1) * displayedItemsNmb + ', "end": ' + pageNmb * displayedItemsNmb + '}'
                    }
                }
            );
            appendChild(paginationBtn, 'a', {'className': 'pagination-link', 'href': '#', 'innerHTML': pageNmb});
            pageBtnHandler(paginationBtn);
        }
        paginationEl.appendChild(fragment);
    }

    loadHeaders();
    createItemElements();
    loadItems(0, parseInt(itemsNmbEl.value));
    createItemsAmountInputHandler();
    loadPaginationBar(1);

})();
