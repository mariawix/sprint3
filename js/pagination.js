/**
 * Created by mariao on 7/6/15.
 */

/**
 * Loads pagination bar into the app.
 */

var paginationBar = (function () {
    /*
     * Pagination bar class names
     */
    var PAGE_BTN = 'page-btn',
        CUR_PAGE_BTN = 'current-page-btn',
        PAGE_LINK = 'page-link';

    /**
     * Creates items per page change event listener and subscribes it to the event bus.
     */
    function handleItemsPerPageElement() {
        elements.itemsPerPage.onchange = function () {
            var curPageNmb = parseInt(helpers.getByClassName(elements.pagesNav, CUR_PAGE_BTN).value, 10);
            eventBus.publish(events.itemsPerPageChanged, parseInt(elements.itemsPerPage.value));
            loadPaginationBar(curPageNmb);
        }
    }

    /**
     * Creates page button click callback and subscribes it to event bus.
     * @param {Element} pageBtnElement button element
     */
    function pageBtnHandler(pageBtnElement) {
        pageBtnElement.onclick = function () {
            var data = JSON.parse(pageBtnElement.dataset.paging),
                curPageNmb = parseInt(helpers.getByClassName(this, PAGE_LINK).innerText, 10);
            eventBus.publish(events.pageBtnClicked, {start: data.start, end: data.end});
            eventBus.publish(events.curPageChanged, curPageNmb);
        }
    }

    function createPaginationBtnElement(curPage, pageNmb, itemsPerPageNmb) {
        var firstItemIndex = (pageNmb - 1) * itemsPerPageNmb,
            endItemIndex = pageNmb * itemsPerPageNmb,
            pageItemAtts, className, btn;
        className = PAGE_BTN;
        if (curPage) {
            className += ' ' + CUR_PAGE_BTN;
        }
        pageItemAtts = {
            'className': className,
            'dataset': { 'paging': '{"start": ' + firstItemIndex + ', "end": ' + endItemIndex + '}' }
        };
        btn = helpers.createCustomElement('li', pageItemAtts);
        helpers.appendChild(btn, 'span', {'className': PAGE_LINK, 'innerText': pageNmb});
        return btn;
    }

    /**
     * Loads pagination bar.
     * @param {Number} curPage number of displayed page
     */
    function loadPaginationBar(curPage) {
        var pageNmb, btn,
            pagingFragment = document.createDocumentFragment(),
            itemsPerPageNmb = (elements.itemsPerPage.value < data.itemsNmb) ? elements.itemsPerPage.value : data.itemsNmb;
        elements.pagesNav.innerHTML = "";
        for (pageNmb = 1; (pageNmb - 1) * itemsPerPageNmb < data.itemsNmb; pageNmb++) {
            btn = createPaginationBtnElement(pageNmb === curPage, pageNmb, itemsPerPageNmb);
            pagingFragment.appendChild(btn);
            pageBtnHandler(btn);
        }
        elements.pagesNav.appendChild(pagingFragment);
    }

    function init() {
        eventBus.subscribe(events.curPageChanged, function (curPageNmb) {
            helpers.getByClassName(elements.pagesNav, CUR_PAGE_BTN).classList.remove(CUR_PAGE_BTN);
            helpers.getByClassName(elements.pagesNav, PAGE_BTN + ':nth-child(' + curPageNmb + ')').classList.add(CUR_PAGE_BTN);
        });
        loadPaginationBar(1);
        handleItemsPerPageElement();
    }

    return {
        init: init
    };

})();