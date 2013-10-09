(function($, Observer, window) {
	'use strict';

	var widgetData = function(data) {
		var instance = {};

		instance.data = data.result;
		instance.raw = data;

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

	Observer.modules.widget = function($el, options) {
		var instance = window.eventable(),
			dataSets = [],
			loadingQueue = [],
			refreshTimer,
			loadOptions = {},
			templateId = 'widgetEJS'
			;

		options = $.extend({
			refresh: 100000, // Refresh every 10 minutes
			autoRefresh: 1,
		}, options || {});

		function loadData(url) {
			if (url.match(/^http|https\:\/\//)) {
				url = '/ajax-proxy?url=' + encodeURIComponent(url);
			}

			$
				.ajax({
					url: url,
					dataType: "json"
				})
				.success(function(data) {
					if (!loadOptions.raw) {
						dataSets.push(widgetData(data));
					} else {
						dataSets.push(data);
					}

					if (loadingQueue.length) {
						loadNextInQueue();
					} else {
						instance.trigger.apply(instance, ['ready.data'].concat(dataSets));
					}
				})
				;
		}

		function loadNextInQueue() {
			loadData(loadingQueue.shift());
		}

		instance.$el = $el;

		instance.dataReady = function(callback) {
			return this.on('ready.data', callback);
		};

		instance.load = function(urls, options) {
			if (options) {
				loadOptions = options;
			}

			if (Array.isArray(urls)) {
				loadingQueue = urls;
			} else {
				loadingQueue.push(urls);
			}

			loadNextInQueue();

			return this;
		};

		instance.enableEjs = function() {
			options.ejs = true;
			return this;
		};

		instance.bindDataToView = function(data) {
			this.$el.html(can.view(templateId, data));
			return this;
		};

		instance.initView = function() {
			if (!options.ejs) {
				this.$el.html($('#' + templateId).html());
			}
			return this;
		};

		instance.refresh = function(ms) {
			if (!ms) { refreshTimer = null; return this; }

			refreshTimer = window.setTimeout(function() {
				window.location.reload();
			}, ms);

			return this;
		};

		instance.jqplot = function(id, dataSets, options) {
			return Observer.jqplot(id, dataSets, options);
		};

		instance.loadAndDrawDateChart = function(resources, callback) {
			var urls = resources.map(function(item) {
				return item.url;
			});

			instance
				.load(urls)
				.dataReady(function() {
					var args = arguments;
					var dataSets = resources.map(function(item, idx) {
						var dataSet = Observer.modules.dataSet(args[idx].data);

						if (item.groupBy) {
							return dataSet
								.groupBy(item.groupBy)
								.output();
						}

						return dataSet.output();
					});

					this
						.jqplot('chart', dataSets, {
							series: resources.map(function(item) {
								return item.option;
							})
						})
						.useDateChart()
						.draw()
						;

					if (callback) {
						callback();
					}
				})
				;

		};

		if (options.autoRefresh) {
			instance.refresh(options.refresh);
		}

		return instance;
	};
}(jQuery, Observer, window, can));
