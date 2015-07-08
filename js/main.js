/**
 * Created by mariao on 6/29/15.
 */


(function (app) {
    "use strict";

    var data = app.data,
        view = app.view,
        pagination = app.pagination,
        cart = app.cart,
        eventBus = app.eventBus;

    view.init(data.getItems(), eventBus);
    pagination.init(data.getItemsNmb(), eventBus);
    view.loadItems(0, pagination.getPagingSize());
    cart.init(eventBus);

})(app);
