//= require canjs/can.jquery
(function($, Observer, window) {
    Observer.modules.widgetDebugger = function($el) {
        var instance = window.eventable();
        var $console = $el.find('[data-console]');

        instance.reset = function() {
            $el.hide();
            $console.html('');
        };

        instance.log = function(log) {
            $el.show();
            $console.append(log);
        };

        if (Observer.debugger.logs.length) {
            instance.log(Observer.debugger.logs.join('\n'));
        }

        return instance;
    };
}(jQuery, Observer, window));
