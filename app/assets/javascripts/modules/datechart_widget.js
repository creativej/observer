(function($, Observer, window) {
    'use strict';

    var helpers = Observer.helpers;

    Observer.modules.dateChartWidget = function(widget) {
        var instance = {
            series: [],
            widget: widget
        };

        instance.loadAndDraw = function(widgetDataOptions, callback) {
            widgetDataOptions.forEach(function(item) {
                if (!item.columns) {
                    instance.series.push(item.series);
                }
            });

            widget
                .load(widgetDataOptions)
                .dataReady(function() {
                    var dataSets = [];

                    for (var idx in arguments) {
                        var widgetData = arguments[idx];
                        var output = widgetData.output();

                        if (widgetData.options.columns) {
                            dataSets = dataSets.concat(output);
                            instance.series = instance.series.concat(widgetData.series());
                        } else {
                            dataSets.push(output[0]);
                        }
                    }

                    if (!dataSets.length) {
                        console.log('No data is loaded... ');
                        return;
                    }

                    this
                        .jqplot('chart', dataSets, {
                            series: instance.series
                        })
                        .useDateChart(widget.options.chartOptions)
                        .draw()
                        ;

                    if (helpers.isCallable(callback)) {
                        callback.apply(this, []);
                    }
                })
            ;
        };

        return instance;
    };

}(jQuery, Observer, window));
