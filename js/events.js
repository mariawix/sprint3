/**
 * Created by mariao on 7/6/15.
 */

var events = (function() {
    return {
        pagingSizeChanged: 'itemsPerPageChanged',
        pageBtnClicked: 'pageBtnClicked',

        addItemBtnClicked: 'addItemBtnPressed',
        removeItemBtnClicked: 'removeItemBtnPressed',
        resetItemAmountEvent: 'resetItemAmount',

        curPageChanged: 'curPageChanged',
        resetCartBtnClicked: 'resetCart',
        sortAscBtnClicked: 'sortAsc',
        sortDescBtnClicked: 'sortDesc',
        addItemToCartEvent: 'addItemToCart',
        removeItemFromCartEvent: 'removeItemFromCart',

        refreshPagingEvent: 'refreshPaging',
        refreshViewEvent: 'refreshView'
    }
})();