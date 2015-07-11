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
    catalog.init(data.getItems(), data.getItemKeys());
    pagination.init(data.getItemsNmb());
    catalog.loadRows(0, pagination.getPagingSize());
    cart.init(data.getBasicItemKeys());

}(app));
