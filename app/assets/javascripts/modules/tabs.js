//= require modules/spinner
//= require actions/save_attribute

(function($, Observer, window) {
    'use strict';

    Observer.module('Tabs', Observer.flightComponent(function() {
        this.defaultAttrs({
            tabsSelector: 'dd',
            panelsSelector: '.content',
            activeClass: 'active'
        });

        this.onClick = function(e) {
            e.preventDefault();
            var $tab = $(e.target).closest(this.attr.tabsSelector);

            this.activateTab($tab);
        };

        this.activateTab = function($tab) {
            var targetSelector = this.panelSelector($tab);

            this.select('tabsSelector').removeClass(this.attr.activeClass);
            $tab.addClass(this.attr.activeClass);

            this.select('panelsSelector').removeClass(this.attr.activeClass);
            this.$node.find(targetSelector).addClass(this.attr.activeClass);
        };

        this.panelSelector = function($tab) {
            return '[data-id="' + $tab.data('target') + '"]';
        };

        this.onActivateTabRequested = function(e) {
            e.preventDefault();

            var $panel = $(e.target).closest(this.attr.panelsSelector);

            var $tab = this.find('[data-target="' + $panel.data('id') + '"]');

            this.activateTab($tab);
        };

        this.after('initialize', function() {
            this.on('click', {
                tabsSelector: this.onClick
            });

            this.on('activateTabRequested', {
                panelsSelector: this.onActivateTabRequested
            });
        });
    }));
}(jQuery, Observer, window));
