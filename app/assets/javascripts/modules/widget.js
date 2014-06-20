//= require knockout-3.1.0
//= require modules/widget_data
//= require modules/datechart_widget

(function($, Observer, window) {
	'use strict';

	/**
	 * Widget
	 * A class for encapsulating widget behaviour in nice methods
	 **/
	Observer.modules.widget = function($el, options) {
		var instance = window.eventable({
				dataSets: [],
				loadingQueue: [],
				refreshTimer: null,
				$el: $el
			})
			;

		/**
		 * Widget.autoRefresh = True
		 * Widget.refresh = 5 minutes
		 * Widget.chartOptions = {}
		 */
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

		/**
		 * Widget#dataReady(callback) -> Widget
		 * - callback (Function): callback function
		 **/
		instance.dataReady = function(callback) {
			return this.on('ready.data', callback);
		};

		/**
		 * Widget#addClass(cls) -> Widget
		 * - cls (string): Add class/es to widget's DOM
		 **/
		instance.addClass = function(cls) {
			this.$el.addClass(cls);
			return this;
		};

		/**
		 * Widget#load(dataOption) -> Widget
		 * dataOption (Object | Array): Data options
		 **/
		instance.load = function(urls) {
			var widgetDataOptions = urls.slice(0);

			if (Array.isArray(widgetDataOptions)) {
				this.loadingQueue = widgetDataOptions;
			} else {
				this.loadingQueue.push(widgetDataOptions);
			}

			loadNextInQueue();

			return this;
		};


		/**
		 * Widget#refresh(ms) -> Widget
		 * - ms (int): 1000 = second
		 **/
		instance.refresh = function(ms) {
			if (!ms) { this.refreshTimer = null; return this; }

			this.refreshTimer = window.setTimeout(function() {
				window.location.reload();
			}, ms);

			return this;
		};


		/**
		 * Widget#jqplot(id, dataOptions, [options]) -> JqplotWidget
		 * - id (string): Id to the dom
		 * - dataOptions (Object | Array): Data options
		 **/
		instance.jqplot = function(id, dataSets, options) {
			return Observer.jqplot(id, dataSets, options);
		};

		/**
		 * Widget#setChartOptions(options) -> Widget
		 * - options (Object)
		 **/
		instance.setChartOptions = function (options) {
			this.options.chartOptions = options;
			return this;
		};

		/**
		 * Widget#applyBindings(model) -> Widget
		 * - model (Object): Knockout model. For detail reference visit: www.knockoutjs.com
		 **/
		instance.applyBindings = function(model) {
			window.ko.applyBindings(model, this.$el.get(0));
			return this;
		};

		/**
		 * Widget#loadDateChart(dataOptions) -> Widget
		 * - dataOptions (Object | Array): Data Options
		 **/
		instance.loadDateChart = function(widgetDataOptions) {
			return Observer.modules.dateChartWidget(this)
				.loadAndDraw(widgetDataOptions);
		};

		if (instance.options.autoRefresh) {
			instance.refresh(instance.options.refresh);
		}

		return instance;
	};
}(jQuery, Observer, window));
