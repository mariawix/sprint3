/**
 * Created by mariao on 6/29/15.
 */


(function (app) {
    "use strict";

    var data = app.data,
        view = app.view,
        pagination = app.pagination,
        cart = app.cart,
        eventBus = new PubSub();

    view.init(data.items, eventBus);
    pagination.init(data.items.length, eventBus);
    view.loadItems(0, pagination.getPagingSize());
    cart.init(eventBus);

})(app);
