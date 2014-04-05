//= require knockout-3.1.0
//= require modules/widget_data
//= require modules/datechart_widget

(function($, Observer, window) {
	'use strict';

	Observer.modules.widget = function($el, options) {
		var instance = window.eventable({
				dataSets: [],
				loadingQueue: [],
				refreshTimer: null,
				$el: $el
			})
			;

		instance.options = $.extend({
			refresh: 5 * 60 * 1000, // Refresh every 5 minutes
			autoRefresh: 1,
			chartOptions: {},
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
					Observer.debugger.log(
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

		instance.setChartOptions = function (options) {
			this.options.chartOptions = options;
			return this;
		};

		instance.applyBindings = function(model) {
			window.ko.applyBindings(model, this.$el.get(0));
			return this;
		};

		instance.loadDateChart = function(widgetDataOptions, callback) {
			return Observer.modules.dateChartWidget(this)
				.loadAndDraw(widgetDataOptions);
		};

		if (instance.options.autoRefresh) {
			instance.refresh(instance.options.refresh);
		}

		return instance;
	};
}(jQuery, Observer, window, can));
