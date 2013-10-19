//= require canjs/can.jquery
//= require modules/widget_data

(function($, Observer, window) {
	'use strict';

	Observer.modules.widget = function($el, options) {
		var instance = window.eventable({
				dataSets: [],
				loadingQueue: [],
				refreshTimer: null,
				templateId: 'widgetEJS',
				$el: $el
			})
			;

		instance.options = $.extend({
			refresh: 100000, // Refresh every 10 minutes
			autoRefresh: 1,
		}, options || {});

		function loadData(widgetDataOptions) {
			var widgetData = Observer.modules.widgetData(widgetDataOptions);

			widgetData
				.init()
				.on('done', function() {
					instance.dataSets.push(this);

					if (instance.loadingQueue.length) {
						loadNextInQueue();
					} else {
						instance.trigger.apply(instance, ['ready.data'].concat(instance.dataSets));
					}
				})
				.on('fail', function(xhr, status, error) {
					console.log(
						error + ' occurred while trying to load ' + this.url()
					);
				});
		}

		function loadNextInQueue() {
			loadData(instance.loadingQueue.shift());
		}

		instance.dataReady = function(callback) {
			return this.on('ready.data', callback);
		};

		instance.addClass = function(cls) {
			this.$el.addClass(cls);
			return this;
		};

		instance.load = function(urls, options) {
			var widgetDataOptions = urls.slice(0);

			if (Array.isArray(widgetDataOptions)) {
				this.loadingQueue = widgetDataOptions;
			} else {
				this.loadingQueue.push(widgetDataOptions);
			}

			loadNextInQueue();

			return this;
		};

		instance.enableEjs = function() {
			this.options.ejs = true;
			return this;
		};

		instance.bindDataToView = function(data) {
			this.$el.html(can.view(this.templateId, data));
			return this;
		};

		instance.initView = function() {
			if (!this.options.ejs) {
				this.$el.html($('#' + this.templateId).html());
			}
			return this;
		};

		instance.refresh = function(ms) {
			if (!ms) { this.refreshTimer = null; return this; }

			this.refreshTimer = window.setTimeout(function() {
				window.location.reload();
			}, ms);

			return this;
		};

		instance.jqplot = function(id, dataSets, options) {
			return Observer.jqplot(id, dataSets, options);
		};

		instance.loadAndDrawDateChart = function(widgetDataOptions, chartOptions, callback) {
			var series = [];

			widgetDataOptions.forEach(function(item) {
				if (!item.columns) {
					series.push(item.series);
				}
			});

			instance
				.load(widgetDataOptions)
				.dataReady(function() {
					var dataSets = [];

					for (var idx in arguments) {
						var widgetData = arguments[idx];
						var output = widgetData.output();

						if (widgetData.options.columns) {
							dataSets = dataSets.concat(output);
							series = series.concat(widgetData.series());
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
							series: series
						})
						.useDateChart(chartOptions)
						.draw()
						;

					if (callback) {
						callback();
					}
				})
				;

		};

		if (instance.options.autoRefresh) {
			instance.refresh(options.refresh);
		}

		return instance;
	};
}(jQuery, Observer, window, can));
