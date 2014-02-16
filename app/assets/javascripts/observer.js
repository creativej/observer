//= require bower_components/moment/moment

(function($, window, flight) {
    "use strict";

    window.Observer = function Application($) {
        var
            instance = {
                modules: {},
                helpers: {
                    argsToArr: function(args) {
                        return Array.prototype.slice.apply(args);
                    },
                    arrayRemove: function(arr, removeItem) {
                        arr = $.grep(arr, function(value) {
                            return value != removeItem;
                        });
                    },
                    integer: function(value, octal) {
                        return parseInt(value, octal || 10);
                    },
                    isCallable: function(value) {
                        return typeof value === 'function';
                    },
                    isString: function(value) {
                        return typeof value === 'string';
                    },
                    isNumber: function(value) {
                        return typeof value === 'number';
                    },
                    countDownTimer: function(callback, options) {
                        function periodDifference(period) {
                            var now = moment.utc().endOf(period).valueOf();
                            var startOfDay = moment.utc().valueOf();
                            diff = now - startOfDay;
                            return diff;
                        }

                        options = $.extend({
                            interval: 1000,
                            period: null
                        }, options);

                        setInterval(function(){
                        if (options.period) {
                            callback(
                                moment.duration(periodDifference(options.period))
                            );
                        } else {
                            callback();
                        }
                        }, options.interval);
                    }
                },
                actions: {},
                mixins: {}
            }
            ;

        instance = window.eventable(instance);

        function pageNamespace(name) {
            return name + '.' + instance.body().data('triggerjs');
        }

        if (window.ZeroClipboard) {
            window.ZeroClipboard.setDefaults({
                moviePath: '/assets/ZeroClipboard.swf'
            });
        }

        instance.body = function() {
            return $('#app_body');
        };

        instance.$spinner = function() {
            return $('.global-spinner .spinner-container');
        };

        instance.onPageReady = function(page, callback) {
            if (Array.isArray(page)) {
                page.forEach(function(p) {
                    instance.on('ready.' + p ,callback);
                });
            } else {
                instance.on('ready.' + page ,callback);
            }
        };

        instance.onPageLoaded = function(page, callback) {
            if (Array.isArray(page)) {
                page.forEach(function(p) {
                    instance.on('loaded.' + p ,callback);
                });
            } else {
                instance.on('loaded.' + page ,callback);
            }
        };

        instance.triggerPageReady = function(data) {
            return instance.trigger(pageNamespace('ready'), data);
        };

        instance.triggerPageLoaded = function(data) {
            return instance.trigger(pageNamespace('loaded'), data);
        };

        instance.mixin = function(name, mixin) {
            this.mixins[name] = mixin;
        };

        instance.module = function(name, module) {
            this.modules[name] = module;
        };

        instance.flightComponent = function() {
            var mixins = [Observer.mixins.withCore];

            for(var arg = 0; arg < arguments.length; arg++)
            {
                var mixin = arguments[arg];

                if (this.helpers.isString(mixin)) {
                    mixin = this.mixins[mixin];
                }

                mixins.push(mixin);
            }

            return flight.component.apply(flight, mixins);
        };

        instance.enableDebug = function() {
            flight.debug.enable();
            flight.debug.events.logAll();
        };

        instance.$document = $(document);

        return instance;
    }($);
}(jQuery, window, flight));
