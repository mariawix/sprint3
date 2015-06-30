/**
 * Created by mariao on 6/29/15.
 */
(function () {
    var itemsTable = document.querySelector('.dynamic-table');
    var headers = itemsTable.querySelectorAll('th');
    var headersText = [];
    for (var i = 0; i < headers.length; i++) {
        headersText[i] = headers[i].dataset['field'];
    }
    var fragment = document.createDocumentFragment();
    var tbody = document.createElement('tbody');
    // Create select
    var select = function () {
        var indexSelector = document.createElement('select');
        for (var i = 0; i < ITEMS.length; i++) {
            var op = document.createElement('option');
            op.setAttribute('value', String(i));
            op.innerHTML = i;
            indexSelector.appendChild(op);
        }
        indexSelector.addEventListener('change', function (e) {
            var newIndex = Number(indexSelector.selectedOptions[0].value);
            var items = itemsTable.querySelectorAll('tbody tr');
            var obj1 = indexSelector.parentNode;
            var obj2 = items[newIndex];
            var oldIndex = 0;
            while (oldIndex < items.length) {
                if (items[oldIndex] === obj1) {
                    break;
                }
                oldIndex++;
            }
            var p = obj1.parentNode;
            if (obj1.nextSibling === obj2) {
                p.insertBefore(obj2, obj1);
            }
            else if (obj2.nextSibling === obj1) {
                p.insertBefore(obj1, obj2);
            }
            else {
                p.insertBefore(obj2, obj1.nextSibling);
                p.insertBefore(obj1, obj2.nextSibling);
            }
            obj2.querySelector('select').selectedIndex = oldIndex;
        });
        return indexSelector;
    }

    ITEMS.forEach(function (item, index, array) {
        // Create rows
        var tr = document.createElement('tr');
        var newSelect = select();
        newSelect.children[index].setAttribute("selected", true);
        tr.appendChild(newSelect);
        for (var i = 1; i < headers.length; i++) {
            var td = document.createElement('td');
            td.className = headersText[i];
            td.innerHTML = item[headersText[i]];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        if (index === ITEMS.length - 1) {
            fragment.appendChild(tbody);
            itemsTable.appendChild(fragment);
        }
    });
})();