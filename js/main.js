/**
 * Created by mariao on 6/29/15.
 */


(function () {
    "use strict";

    view.init(data);
    paginationBar.init();
    handleResetCartButton();



    /**
     * Creates a listener for reset cart event and subscribes it to the event bus.
     */
    function handleResetCartButton() {
        elements.resetCart.onclick = function () {
            eventBus.publish(events.resetCart, {});
        };
    }
})();
