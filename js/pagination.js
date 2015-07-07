/**
 * Created by mariao on 7/6/15.
 */

/**
 * Loads pagination module into the app.
 */
(function (app) {

    var pageBtnClass = 'page-btn',
        curPageBtnClass = 'current-page-btn',
        pageLinkClass = 'page-link',

        pagesNav = document.querySelector('.pages-nav'),
        itemsPerPage = document.querySelector('.items-per-page-input');

    /**
     * Creates paging size change event listener and subscribes it to the event bus.
     * @param {Number} itemsNmb total number of items
     * @param {Object} app event manager
     */
    function handleItemsPerPageElement(itemsNmb, eventBus) {
        itemsPerPage.onchange = function () {
            eventBus.publish(events.pagingSizeChanged, getPagingSize());
            loadPaginationBar(getCurPageNmb(), itemsNmb, eventBus);
        }
    }

    /**
     * Creates page button click callback and subscribes it to the event bus.
     * @param {Element} pageBtnElement button element
     * @param {Object} app event manager
     */
    function pageBtnHandler(pageBtnElement, eventBus) {
        pageBtnElement.onclick = function () {
            var data = JSON.parse(pageBtnElement.dataset.paging), clickedPage, clickedPageNmb;
            clickedPage = helpers.getByClassName(pageBtnElement, pageLinkClass);
            clickedPageNmb = parseInt(clickedPage.innerText, 10);
            eventBus.publish(events.pageBtnClicked, {start: data.start, end: data.end});
            eventBus.publish(events.curPageChanged, clickedPageNmb);
        }
    }

    /**
     * Creates pagination button.
     * @param {Number} curPage number of displayed page
     * @param {Number} pageNmb number of button to create
     * @param {Number} pagingSize number of items displayed on a single page
     * @returns {Element} created button
     */
    function createPaginationBtnElement(curPage, pageNmb, pagingSize) {
        var firstItemIndex = (pageNmb - 1) * pagingSize,
            endItemIndex = pageNmb * pagingSize,
            pageItemAtts, className, btn;
        className = pageBtnClass;
        if (curPage) {
            className += ' ' + curPageBtnClass;
        }
        pageItemAtts = {
            'className': className,
            'dataset': { 'paging': '{"start": ' + firstItemIndex + ', "end": ' + endItemIndex + '}' }
        };
        btn = helpers.createCustomElement('li', pageItemAtts);
        helpers.appendChild(btn, 'span', {'className': pageLinkClass, 'innerText': pageNmb});
        return btn;
    }

    /**
     * Loads pagination bar.
     * @param {Number} curPage number of displayed page
     * @param {Number} itemsNmb total number of items
     * @param {Object} app event manager
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

    /**
     * Returns number of the currently displayed page.
     * @returns {Number} number of the current page
     */
    function getCurPageNmb() {
        var curPageBtn, curPageLink, curPageNmb;
        curPageBtn = helpers.getByClassName(pagesNav, curPageBtnClass);
        curPageLink = helpers.getByClassName(curPageBtn, pageLinkClass);
        curPageNmb = parseInt(curPageLink.innerText, 10);
        return isNaN(curPageNmb) ? 1 : curPageNmb;
    }

    /**
     * Returns number of items displayed on a single page.
     * @returns {Number} number of items displayed on a single page.
     */
    function getPagingSize() {
        return parseInt(itemsPerPage.value, 10);
    }

    /**
     * Initializes pagination module.
     * @param {Number} itemsNmb overall number of the items
     * @param {Object} eventBus app event manager
     */
    function init(itemsNmb, eventBus) {
        eventBus.subscribe(events.curPageChanged, function (curPageNmb) {
            helpers.getByClassName(pagesNav, curPageBtnClass).classList.remove(curPageBtnClass);
            helpers.getByClassName(pagesNav, pageBtnClass + ':nth-child(' + curPageNmb + ')').classList.add(curPageBtnClass);
        });

        eventBus.subscribe(events.refreshPagingEvent, function() {
            eventBus.publish(events.refreshViewEvent, getPagingSize());
        });

        loadPaginationBar(1, itemsNmb, eventBus);
        handleItemsPerPageElement(itemsNmb, eventBus);
    }

    app.pagination = {
        init: init,
        getPagingSize: getPagingSize
    };

})(app);