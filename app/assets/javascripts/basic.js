//= require jquery
//= require bower_components/es5-shim/es5-shim
//= require bower_components/es5-shim/es5-sham
//= require jqplot/jquery.jqplot.js
//= require jqplot/plugins/jqplot.dateAxisRenderer
//= require jqplot/plugins/jqplot.cursor
//= require jqplot/plugins/jqplot.highlighter
//= require mixins/eventable
//= require observer
//= require mixins/with_core
//= require observer/debugger
//= require modules/jqplot
//= require modules/data_set
//= require bower_components/moment/moment
//= require modules/widget

(function($, window) {
    $(function() {
        var
            $el = $('[data-widget-sandbox]'),
            $window = $(window)
            ;
        $el.css('width', $window.width());
        $el.css('height', $window.height());

        Observer.on('log', function (log) {
            window.parent.Observer.trigger('log', log);
        });
    });
}(jQuery, window));
