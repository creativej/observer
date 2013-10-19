(function($, Observer, window) {
    'use strict';

    Observer.modules.widgetData = function(options) {
        var instance = window.eventable();

        instance.options = $.extend({
            dataType: 'json',
            url: urlFromOptions(options)
        }, options);


        instance.url = function() {
            return this.options.url;
        };

        instance.setData = function(data) {
            if (instance.options.ignoreFirst) {
                data.result.shift();
            }

            if (instance.options.ignoreLast) {
                data.result.pop();
            }

            this.raw = data;
            this.data = data.result;
            return this;
        };

        instance.series = function() {
            if (this.options.columns) {
                return this.options.columns.map(function(column) {
                    return column.series;
                });
            }
        };

        instance.dataSet = function() {
            return Observer.modules.dataSet(this.data)
                .setColumns(this.options.columns)
                .groupBy(this.options.groupBy);
        };

        instance.output = function() {
            return this.dataSet().output();
        };

        instance.init = function() {
            $
                .ajax({
                    url: this.options.url,
                    dataType: this.options.dataType
                })
                .done(function(data) {
                    instance
                        .setData(data)
                        .trigger('done');
                })
                .fail(function(jqXHR, textStatus, error) {
                    instance.trigger('fail', jqXHR, textStatus, error);
                });

            this.trigger('init');

            return this;
        };

        instance.first = function(name) {
            return this.data[0];
        };

        instance.val = function(name) {
            var first = this.first();
            var keys = Object.keys(first);

            if (!name) {
                if (keys.length === 1 && first.hasOwnProperty(keys[0])) {
                    return first[keys[0]];
                }
            } else {
                if (first.hasOwnProperty(name)) {
                    return first[name];
                }
            }
        };

        return instance;
    };

    function urlFromOptions(options) {
        var url;

        if (typeof options === 'string') {
            url = options;
        } else {
            url = options.url;
        }

        if (url.match(/^http|https\:\/\//)) {
            url = '/ajax-proxy?url=' + encodeURIComponent(url);
        }

        return url;
    }
}(jQuery, Observer, window));
