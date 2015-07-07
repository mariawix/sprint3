/**
 * Created by mariao on 7/6/15.
 */

/**
 * Loads pagination bar into the app.
 */

(function (app) {
    /*
     * Pagination bar class names
     */
    var PAGE_BTN = 'page-btn',
        CUR_PAGE_BTN = 'current-page-btn',
        PAGE_LINK = 'page-link',

        pagesNav = document.querySelector('.pages-nav'),
        itemsPerPage = document.querySelector('.items-per-page-input');

    /**
     * Creates items per page change event listener and subscribes it to the event bus.
     */
    function handleItemsPerPageElement(itemsNmb, eventBus) {
        itemsPerPage.onchange = function () {
            eventBus.publish(events.itemsPerPageChanged, getPagingSize());
            loadPaginationBar(getCurPageNmb(), itemsNmb, eventBus);
        }
    }

    /**
     * Creates page button click callback and subscribes it to event bus.
     * @param {Element} pageBtnElement button element
     */
    function pageBtnHandler(pageBtnElement, eventBus) {
        pageBtnElement.onclick = function () {
            var data = JSON.parse(pageBtnElement.dataset.paging),
                clickedPageNmb = parseInt(helpers.getByClassName(pageBtnElement, PAGE_LINK).innerText, 10);
            eventBus.publish(events.pageBtnClicked, {start: data.start, end: data.end});
            eventBus.publish(events.curPageChanged, clickedPageNmb);
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
    function loadPaginationBar(curPage, itemsNmb, eventBus) {
        var pageNmb, btn,
            pagingFragment = document.createDocumentFragment(),
            itemsPerPageNmb = (itemsPerPage.value < itemsNmb) ? itemsPerPage.value : itemsNmb;
        pagesNav.innerHTML = "";
        // TODO: unsubscribe handlers
        for (pageNmb = 1; (pageNmb - 1) * itemsPerPageNmb < itemsNmb; pageNmb++) {
            btn = createPaginationBtnElement(pageNmb === curPage, pageNmb, itemsPerPageNmb, eventBus);
            pagingFragment.appendChild(btn);
            pageBtnHandler(btn, eventBus);
        }
        pagesNav.appendChild(pagingFragment);
    }

    function getCurPageNmb() {
        var curPageBtn, curPageLink, curPageNmb;
        curPageBtn = helpers.getByClassName(pagesNav, CUR_PAGE_BTN);
        curPageLink = helpers.getByClassName(curPageBtn, PAGE_LINK);
        curPageNmb = parseInt(curPageLink.innerText, 10);
        return isNaN(curPageNmb) ? 1 : curPageNmb;
    }

    function getPagingSize() {
        return parseInt(itemsPerPage.value, 10);
    }

    function init(itemsNmb, eventBus) {
        eventBus.subscribe(events.curPageChanged, function (curPageNmb) {
            helpers.getByClassName(pagesNav, CUR_PAGE_BTN).classList.remove(CUR_PAGE_BTN);
            helpers.getByClassName(pagesNav, PAGE_BTN + ':nth-child(' + curPageNmb + ')').classList.add(CUR_PAGE_BTN);
        });

        eventBus.subscribe(events.refreshPaging, function() {
            eventBus.publish(events.refreshView, getPagingSize());
        });

        loadPaginationBar(1, itemsNmb, eventBus);
        handleItemsPerPageElement(itemsNmb, eventBus);
    }

    app.pagination = {
        init: init,
        getPagingSize: getPagingSize
    };

})(app);