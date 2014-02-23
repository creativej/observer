(function($, window, Observer, undefined) {
    'use strict';

    Observer.mixins.withCore = function() {
        this.proxy = function(callback) {
            if (Observer.helpers.isCallable(callback)) {
                return $.proxy(callback, this);
            }
            return $.proxy(this[callback], this);
        };

        this.bubbleEvent = function(obj, event, callback) {
            if (callback === undefined) {
                callback = function() {
                    this.trigger(event);
                };
            }
            obj.on(event, this.proxy(callback));
        };

        this.isUndefined = function(value) {
            return value === undefined;
        };

        this.isDefined = function(value) {
            return !this.isUndefined(value);
        };

        this.isString = function(value) {
            return Observer.helpers.isString(value);
        };

        this.isArray = function(value) {
            return value instanceof Array;
        };

        this.find = function(selector) {
            return this.$node.find(selector);
        };
    };

}(jQuery, window, Observer));
