(function($, Observer, window, undefined) {
    "use strict";
    var
        debugKey = 'observer-debug',
        logKey = 'observer-log'
        ;

    Observer.debugger = {
        logs: [],
    };

    Observer.isDebugMode = function() {
        return get(logKey);
    };

    Observer.debugger.enableLog = function() {
        set(logKey, true);
    };

    Observer.debugger.disableLog = function() {
        set(logKey, false);
    };

    Observer.debugger.log = function() {
        if (get(logKey)) {
            var log = '';

            for (var index in arguments) {
                log += arguments[index] + ' ';
            }

            log += '\n';

            Observer.debugger.logs.push(log);
            console.log.apply(console, arguments);
            Observer.trigger('log', log);
        }
    };

    function set(key, value)
    {
        if (value === undefined) {
            value = 1;
        }

        window.localStorage.setItem(key, (value) ? 1 : 0);
    }

    function get(key)
    {
        return parseInt(window.localStorage.getItem(key), 10);
    }

}(jQuery, Observer, window));
