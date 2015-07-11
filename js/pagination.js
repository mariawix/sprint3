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

        eventBus = app.eventBus,

        paginationListElement = document.querySelector('.pagination-list'),
        pagingSizeElement = document.querySelector('.paging-size');

    /**
     * Creates paging size change event listener and subscribes it to the event bus.
     * @param {Number} itemsNmb total number of items
     */
    function handlePagingSizeElement(itemsNmb) {
        pagingSizeElement.onchange = function () {
            eventBus.publish(eventBus.eventNames.pagingSizeChanged, getPagingSize());
            loadPaginationBar(getCurPageNmb(), itemsNmb);
        }
    }

    /**
     * Creates page button click callback and subscribes it to the event bus.
     * @param {Element} pageBtnElement button element
     */
    function pageBtnHandler(pageBtnElement) {
        pageBtnElement.onclick = function () {
            var data = JSON.parse(pageBtnElement.dataset.paging), clickedPage, clickedPageNmb;
            clickedPage = helpers.getElementByClassName(pageBtnElement, pageLinkClass);
            clickedPageNmb = parseInt(clickedPage.innerText, 10);
            eventBus.publish(eventBus.eventNames.pageBtnClicked, {start: data.start, end: data.end});
            eventBus.publish(eventBus.eventNames.curPageChanged, clickedPageNmb);
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
     */
    function loadPaginationBar(curPage, itemsNmb) {
        var pageNmb, btn,
            pagingFragment = document.createDocumentFragment(),
            itemsPerPageNmb = (pagingSizeElement.value < itemsNmb) ? pagingSizeElement.value : itemsNmb;
        paginationListElement.innerHTML = "";
        // TODO: unsubscribe handlers
        for (pageNmb = 1; (pageNmb - 1) * itemsPerPageNmb < itemsNmb; pageNmb++) {
            btn = createPaginationBtnElement(pageNmb === curPage, pageNmb, itemsPerPageNmb);
            pagingFragment.appendChild(btn);
            pageBtnHandler(btn);
        }
        paginationListElement.appendChild(pagingFragment);
    }

    /**
     * Returns number of the currently displayed page.
     * @returns {Number} number of the current page
     */
    function getCurPageNmb() {
        var curPageBtn, curPageLink, curPageNmb;
        curPageBtn = helpers.getElementByClassName(paginationListElement, curPageBtnClass);
        curPageLink = helpers.getElementByClassName(curPageBtn, pageLinkClass);
        curPageNmb = parseInt(curPageLink.innerText, 10);
        return isNaN(curPageNmb) ? 1 : curPageNmb;
    }

    /**
     * Returns number of items displayed on a single page.
     * @returns {Number} number of items displayed on a single page.
     */
    function getPagingSize() {
        return parseInt(pagingSizeElement.value, 10);
    }

    /**
     * Initializes pagination module.
     */
    function init(itemsNmb) {
        eventBus.subscribe(eventBus.eventNames.curPageChanged, function (curPageNmb) {
            helpers.getElementByClassName(paginationListElement, curPageBtnClass).classList.remove(curPageBtnClass);
            helpers.getElementByClassName(paginationListElement, pageBtnClass + ':nth-child(' + curPageNmb + ')').classList.add(curPageBtnClass);
        });

        eventBus.subscribe(eventBus.eventNames.reloadPagination, function() {
            eventBus.publish(eventBus.eventNames.reloadItems, getPagingSize());
        });

        loadPaginationBar(1, itemsNmb);
        handlePagingSizeElement(itemsNmb);
    }

    app.pagination = {
        init: init,
        getPagingSize: getPagingSize
    };

}(app));