/**
 * Created by mariao on 7/6/15.
 */

var events = (function() {
    return {
        itemsPerPageChanged: 'itemsPerPageChanged',
        pageBtnClicked: 'pageBtnClicked',

        addItemBtnClicked: 'addItemBtnPressed',
        removeItemBtnClicked: 'removeItemBtnPressed',
        resetItemAmount: 'resetItemAmount',

        curPageChanged: 'curPageChanged',
        resetCart: 'resetCart',
        sortAsc: 'sortAsc',
        sortDesc: 'sortDesc',
        addItemToCart: 'addItemToCart',
        removeItemFromCart: 'removeItemFromCart',

        refreshPaging: 'refreshPaging',
        refreshView: 'refreshView'
    }
})();