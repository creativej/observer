(function($, window, Observer, flight) {
    'use strict';

    Observer.modules.WidgetEditorsLayout = flight.component(function() {
        this.onHtmlModeRquested = function() {
            this.$node
                .removeAttr('data-scss-mode')
                .attr('data-html-mode', true);
        };

        this.onScssModeRequested = function() {
            this.$node
                .removeAttr('data-html-mode')
                .attr('data-scss-mode', true);
        };

        this.after('initialize', function() {
            this.on(document, 'htmlModeRequested', this.onHtmlModeRquested);
            this.on(document, 'scssModeRequested', this.onScssModeRequested);
        });
    });

}($, window, Observer, flight));
