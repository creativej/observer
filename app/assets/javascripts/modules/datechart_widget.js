(function($, Observer, window) {
    'use strict';

    var helpers = Observer.helpers;

    Observer.modules.dateChartWidget = function(widget) {
        var instance = window.eventable({
            series: [],
            widget: widget
        });

        instance.loadAndDraw = function(widgetDataOptions) {
            widgetDataOptions.forEach(function(item) {
                if (!item.columns) {
                    instance.series.push(item.series);
                }
            });

            this.widget
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

                    var jqplot = this
                        .jqplot('chart', dataSets, {
                            series: instance.series
                        })
                        .useDateChart(widget.options.chartOptions)
                        ;

                    instance.trigger('beforeDraw', jqplot);
                    jqplot.draw();
                    instance.trigger('afterDraw', jqplot);
                })
                ;
            return this;
        };

        return instance;
    };

}(jQuery, Observer, window));
