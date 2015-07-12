/**
 * Created by mariao on 7/6/15.
 */

/**
 * DOM help functions.
 */
var helpers = (function() {
    var tableHeadCellClass = 'th',
        tableBodyCellClass = 'td',
        tableHeadClass = 'thead',
        tableBodyClass = 'tbody',
        tableRowClass = 'tr',

        totalBillElement = document.querySelector('.total-bill');
    /**
     * Creates a new DOM element and appends it to the specified parent element.
     * @param {Element} parentElement parent element of the newly created element
     * @param {String} tagName tag name of the child element
     * @param {Object} attributes attributes of the child element in the form {name: value, name: value ...}
     * @returns {Element} the newly created element
     */
    function appendChild(parentElement, tagName, attributes) {
        var attributeName, childElement;
        childElement = helpers.createCustomElement(tagName, attributes);
        parentElement.appendChild(childElement);
        return childElement;
    }

    /**
     * Creates a new element with given tag name and attributes.
     * @param {String} tagName tag name of created element
     * @param {Object} attributes attributes of the given element
     * @returns {Element} created element
     */
    function createCustomElement(tagName, attributes) {
        var element = document.createElement(tagName), attKey, objKey;
        for (attKey in attributes) {
            if ((typeof attributes[attKey]) === 'object') {
                for (objKey in attributes[attKey]) {
                    element[attKey][objKey] = attributes[attKey][objKey];
                }
            }
            else {
                element[attKey] = attributes[attKey];
            }
        }
        return element;
    }

    /**
     * Returns a child element with given class name, contained inside specified parent element.
     * @param {Element} parentElement parent element to search in
     * @param {String} className class name of the child element
     * @returns {Element} child element if found, undefined - otherwise
     */
    function getElementByClassName(parentElement, className) {
        return parentElement.querySelector('.' + className);
    }

    /**
     * Loads header cells to the head of the table.
     * @param {Element} tableElement parent table element
     * @param {Array} headerNames names of header cells to be created
     * @param {Function} appendSortBtns a callback function appending sort buttons to the header cell
     */
    function loadTableHead(tableElement, headerNames, appendSortBtns) {
        var row = createCustomElement('div', {'className': tableRowClass}),
            tableHeadElement = getElementByClassName(tableElement, tableHeadClass);

        /**
         * Appends a header cell to the given head row.
         * @param {Element} row parent row element
         * @param {String} headerName name of header cell to be created
         * @param {Function} appendSortBtns a callback function appending sort buttons to the header cell
         */
        function appendHeaderCell(row, headerName, appendSortBtns) {
            var headerCell,
                headerCellAttributes =  {
                    'innerText': headerName,
                    'className': tableHeadCellClass + ' ' + headerName
                };
            headerCell = appendChild(row, 'div', headerCellAttributes);
            appendSortBtns(headerCell, headerName, true);
            appendSortBtns(headerCell, headerName, false);
        }

        headerNames.forEach(function(header) {
            appendHeaderCell(row, header, appendSortBtns);
        });
        tableHeadElement.appendChild(row);
        tableElement.appendChild(tableHeadElement);
    }

    /**
     * Loads rows at indices [firstIndex, endIndex - 1] into the given table.
     * @param {Element} tableElement table element to load rows into
     * @param {Array} rows rows to be loaded
     * @param {Number} firstIndex index of the first row to be loaded
     * @param {Number} endIndex index at which to stop loading
     */
    function loadRows(tableElement, rows, firstIndex, endIndex) {
        var rowIndex, tableBodyElement = getElementByClassName(tableElement, tableBodyClass);
        endIndex = (endIndex < rows.length) ? endIndex : rows.length;
        tableBodyElement.innerHTML = "";
        for (rowIndex = firstIndex; rowIndex < endIndex; rowIndex++) {
            tableBodyElement.appendChild(rows[rowIndex]);
        }
        tableElement.appendChild(tableBodyElement);
    }

    /**
     * Returns element value by class name.
     * @param {Element} parentElement a reference to a surrounding element
     * @param {String} className class name of the element to search
     * @returns value of the element
     */
    function getElementValueByClassName(parentElement, className) {
        var val = getElementByClassName(parentElement, className).innerText, valNmb;
        valNmb = parseInt(val, 10);
        return (isNaN(valNmb)) ? val : valNmb;
    }

    /**
     * Returns the first body row of the specified table
     * @param {Element} tableElement table element containing the row
     * @returns {Element} the first row of the body
     */
    function getFirstBodyRow(tableElement) {
        var tableBodyElement = getElementByClassName(tableElement, tableBodyClass);
        return getElementByClassName(tableBodyElement, tableRowClass + ':first-child');
    }

    /**
     * Creates row elements from objects.
     * @param {Array} objects objects corresponding to rows
     * @param {Array} keys cell names
     * @param {Function} appendCellContent called to append content to cells
     */
    function createRowElements(objects, keys, appendCellContent) {
        var i, rowElement, rowElements = [];
        /**
         * Creates a row element.
         * @param {Object} obj object corresponding to the row
         * @param {Number} index row index
         * @param {Function} appendCellContent function appending content to cells
         */
        function createRowElement(keys, obj, index, appendCellContent) {
            var rowElementClass = tableRowClass + ' ' + obj.type,
                rowElement = createCustomElement('div', {'className': rowElementClass, 'dataset': {'index': index}});
            keys.forEach(function(key) {
                var className = key + ' ' + tableBodyCellClass,
                    cell = appendChild(rowElement, 'div', {'className': className});
                appendCellContent(key, obj, cell);
            });
            return rowElement;
        }

        for (i = 0; i < objects.length; i++) {
            rowElement = createRowElement(keys, objects[i], i, appendCellContent);
            rowElements.push(rowElement);
        }
        return rowElements;
    }

    /**
     * Exposes the given element.
     * @param element an element
     */
    function exposeElement(element) {
        if (element.classList.contains('visuallyhidden')) {
            element.classList.remove('visuallyhidden');
        }
    }

    /**
     * Hides the given element
     * @param element an element
     */
    function hideElement(element) {
        if (!element.classList.contains('visuallyhidden')) {
            element.classList.add('visuallyhidden');
        }
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

    return {
        appendChild: appendChild,
        createCustomElement: createCustomElement,

        getElementByClassName: getElementByClassName,
        getElementValueByClassName: getElementValueByClassName,

        loadTableHead: loadTableHead,
        loadRows: loadRows,

        getFirstBodyRow: getFirstBodyRow,
        createRowElements: createRowElements,

        hideElement: hideElement,
        exposeElement: exposeElement,

        cart: {
            getTotalBillValue: getTotalBillValue,
            setTotalBillValue: setTotalBillValue
        }
    }
}());