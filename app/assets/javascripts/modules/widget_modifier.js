//= require actions/remove_widget_from_dashboard
(function($, Observer, window) {
    'use strict';

    Observer.modules.widgetModifier = function($el, options) {
        var
            instance = window.eventable(),
            $removeBtn = $el.find('[data-remove]')
            ;

        options = $.extend({
            remove: false
        }, options || {});

        $el.mouseover(function() {
            $el.attr('data-show', 1);
        });

        $el.mouseout(function() {
            $el.attr('data-show', 0);
        });

        if ($removeBtn.length) {
            $removeBtn.on('click', function() {
                instance.trigger('clicked.remove');
            });
        }

        return instance;
    };

}(jQuery, Observer, window));
