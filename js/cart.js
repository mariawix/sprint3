/**
 * Created by mariao on 7/6/15.
 */

(function(app) {
    var totalBill = document.querySelector('.total-bill'),
        resetCart = document.querySelector('.reset-cart-btn'),

        items = [];

    function getTotalBillValue() {
        return parseInt(totalBill.value, 10);
    }

    function init(eventBus) {

        resetCart.onclick = function () {
            items.forEach(function(item) {
                eventBus.publish(events.resetItemAmount + item.id, {});
            });
            items = [];
            totalBill.value = 0;
        };

        eventBus.subscribe(events.addItemToCart, function(data) {
            var i, found = false;
            for (i = 0; i < items.length && !found; i++) {
                if (items[i].id === data.item.id) {
                    items[i].amount = (items[i].amount) ? 1 + items[i].amount : 1;
                    totalBill.value = getTotalBillValue() + data.item.price;
                    found = true;
                }
            }
            if (!found) {
                data.item.amount = 1;// TODO: copy it
                items.push(data.item);
                totalBill.value = getTotalBillValue() + data.item.price;
            }
        });

        eventBus.subscribe(events.removeItemFromCart, function(data) {
            var i;
            for (i = 0; i < items.length; i++) {
                if (items[i].id === data.item.id) {
                    if (items[i].amount && items[i].amount > 0) {
                        items[i].amount = items[i].amount - 1;
                        totalBill.value = getTotalBillValue() - data.item.price;
                        i = items.length; // break
                    }
                }
            }
        });
    }

    app.cart = {
        init: init
    };
})(app);
