/**
 * Created by mariao on 7/6/15.
 */

var elements = (function(){
    return {
            itemsTable: document.querySelector('.items-table'),
            itemsPerPage: document.querySelector('.items-per-page-input'),
            totalBill: document.querySelector('.total-bill'),
            pagesNav: document.querySelector('.pages-nav'),
            resetCart: document.querySelector('.reset-cart-btn'),
            itemsTableHead: document.querySelector('.items-table .thead'),
            itemsTableBody: document.querySelector('.items-table .tbody')
        };
})();