/**
 * Created by mariao on 6/30/15.
 */
function PubSub() {
    /* {
     *     name1: [cb11, cb12, ... ],
     *     ...
     *     nameN: [cbN1, cbN2, ... ]
     * }
     */
    var events = {};

    /**
     * Returns true if there exists an event with the given name and id, false - otherwise.
     * @param {String} name event name
     * @param {Number} id event id
     * @returns {Boolean} true if there exists an event with the given name and id, false - otherwise.
     */
    function exists(name, id) {
        return (events[name] && id < events[name].length) ? true : false;
    }

    /**
     * Registers a new event and returns its id.
     * @param {String} name event name
     * @param {Function} cb callback function of the event
     * @returns {Number} id of the subscribed event
     */
    this.subscribe = function (name, cb) {
        if (!events.hasOwnProperty(name)) {
            events[name] = [];
        }
        events[name].push(cb);
        return events[name].length - 1;

    }
    /**
     * Removes event with specified name from the event bus.
     * @param {String} name event name
     * @param {Number} id event id
     * @returns {Boolean} true if succeeds, false - otherwise
     */
    this.unsubscribe = function (name, id) {
        if (!exists(name, id)) {
            return false;
        }
        else {
            events[name].slice(id, 1);
            return true;
        }
    }

    /**
     * Runs the event with specified name.
     * Returns true if succeeds, false - otherwise.
     * @param {String} name event name
     * @param {Number} id event id
     * @param {Object} data data to be passed to event handler
     * @returns {Boolean} true if succeeds, false - otherwise
     */
    this.publish = function(name, id, data) {
        if (!exists(name, id)) {
            return false;
        }
        else {
            events[name][id](data);
            return true;
        }
    }
}
