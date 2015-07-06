/**
 * Created by mariao on 7/6/15.
 */

/**
 * Returns help functions.
 */
var helpers = (function() {
    /**
     * Creates a new DOM element and appends it to the specified parent element.
     * @param {Element} parentElement parent element of the newly created element
     * @param {String} tagName tag name of the child element
     * @param {Object} attributes attributes of the child element in the form {name: value, name: value ...}
     * @returns {Element} the newly created element
     */
    function appendChild(parentElement, tagName, attributes) {
        var attributeName, childElement;
        childElement = helpers.createCustomElement(tagName, attributes);
        parentElement.appendChild(childElement);
        return childElement;
    }

    /**
     * Creates a new element with given tag name and attributes.
     * @param {String} tagName tag name of created element
     * @param {Object} attributes attributes of the given element
     * @returns {Element} created element
     */
    function createCustomElement(tagName, attributes) {
        var element = document.createElement(tagName), attributeName, subAttributeName;
        for (attributeName in attributes) {
            if ((typeof attributes[attributeName]) === 'object') {
                for (subAttributeName in attributes[attributeName]) {
                    element[attributeName][subAttributeName] = attributes[attributeName][subAttributeName];
                }
            }
            else {
                element[attributeName] = attributes[attributeName];
            }
        }
        return element;
    }

    /**
     * Returns a child element with given class name, contained inside specified parent element.
     * @param {Element} parentElement parent element to search in
     * @param {String} className class name of the child element
     * @returns {Element} child element if found, undefined - otherwise
     */
    function getByClassName(parentElement, className) {
        return parentElement.querySelector('.' + className);
    }

    return {
        appendChild: appendChild,
        createCustomElement: createCustomElement,
        getByClassName: getByClassName
    }
})();