/**
 * Created by mariao on 6/29/15.
 */


(function (app) {
    "use strict";

    var data = app.data,
        catalog = app.catalog,
        pagination = app.pagination,
        cart = app.cart,
        eventBus = app.eventBus;

    quantityButtons.setEventManager(eventBus);
    catalog.init(data.getItems(), data.Item.getItemKeys());
    pagination.init(data.getItemsNmb());
    catalog.loadRows(0, pagination.getPagingSize());
    cart.init(data.Item.getBasicItemKeys(), data.coupons);
    handleSwitchThemeButton();



    /**
     * Adds event listener to switch theme button click event.
     */
    function handleSwitchThemeButton() {
        var switchThemeBtn = document.querySelector('.switch-theme-btn'),
            body = document.querySelector('body');
        switchThemeBtn.onclick = function(e) {
            e.preventDefault();
            if (body.classList.contains('classic-theme')) {
                body.classList.remove('classic-theme');
                body.classList.add('bright-theme');
            }
            else {
                body.classList.add('classic-theme');
                body.classList.remove('bright-theme');
            }
        }
    }

}(app));
