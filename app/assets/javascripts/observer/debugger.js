(function($, Observer, window, undefined) {
    "use strict";
    var
        debugKey = 'observer-debug',
        logKey = 'observer-log',
        systemLog = window.console.log;

    Observer.debugger = {};

    window.console.log = function() {
        if (get(logKey)) {
            systemLog.apply(window.console, arguments);
        }
    };

    Observer.isDebugMode = function() {
        return get(logKey);
    };

    Observer.debugger.enable = function() {
        this.log(true);
    };

    Observer.debugger.disable = function() {
        this.log(false);
    };

    Observer.debugger.log = function(enableLog) {
        set(logKey, enableLog);
    };

    // Observer.debugger.debug = function(isDebug) {
    //     setConfig(debugKey, isDebug);
    // };

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
