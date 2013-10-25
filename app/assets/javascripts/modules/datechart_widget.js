(function($, Observer, window) {
    'use strict';

    var helpers = Observer.helpers;

    Observer.modules.dateChartWidget = function(widget) {
        var instance = window.eventable({
            series: [],
            widget: widget
        });

        instance.normalizeDataSets = function(dataSets) {
            var largestSet;

            dataSets.forEach(function(dataSet) {
                if (!largestSet || largestSet.length < dataSet.length) {
                    largestSet = dataSet;
                }
            });

            dataSets.forEach(function(dataSet) {
                var diff = largestSet.length - dataSet.length;
                var lastIndex = largestSet.length - 1;
                if (diff) {
                    for (var i = lastIndex - diff; i <= lastIndex; i++) {
                        if (dataSet[i]) {
                            dataSet.push(
                                [largestSet[i][0], 0]
                            );
                        }
                    }
                }
            });
        };

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
                        Observer.debugger.log('No data is loaded... ');
                        return;
                    }

                    if (widget.options.chartOptions.stackSeries) {
                        instance.normalizeDataSets(dataSets);
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
