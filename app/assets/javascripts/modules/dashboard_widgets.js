(function($, Observer, window) {
    'use strict';

    Observer.module(
        'DashboardWidgets',
        Observer.flightComponent(function() {
            this.defaultAttrs({
                itemSelectors: '[data-widget-item]'
            });

            this.fields = [
                'id',
                'meta',
                'html',
                'css',
                'js',
                'column',
                'row',
                'data'
            ];

            this.$items = function() {
                return this.select('itemSelectors');
            };

            this.$activeItem = function() {
                return this.$items().filter('[data-active]');
            };

            this.onUpdateDataRequested = function(e, data) {
                this.$activeItem().data('data', data.value);
            };

            this.valueOf = function($item) {
                var obj = {};

                this.fields.forEach(function(name) {
                    obj[name] = $item.data(name);
                });

                return obj;
            };

            this.activateItem = function($item) {
                this.$items().attr('data-active', null);
                $item.attr('data-active', '');

                this.trigger('change', this.valueOf($item));
            };

            this.onItemClicked = function(e) {
                var $item = $(e.target);
                this.activateItem($item);
            };

            this.after('initialize', function() {
                this.on('updateDataRequested', this.onUpdateDataRequested);

                this.on('click', {
                    itemSelectors: this.onItemClicked
                });

                this.on('activateFirstItemRequested', function() {
                    this.activateItem(this.$items().first());
                });
            });
        })
    );
}(jQuery, Observer, window));

