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
			refreshTimer
			;

		options = $.extend({
			refresh: 100000, // Refresh every 10 minutes
			autoRefresh: 1,
		}, options || {});

		function dataLoaded(data) {
			dataSets.push(widgetData(data));
			if (dataSets.length === loadingQueue.length) {
				instance.trigger.apply(instance, ['ready.data'].concat(dataSets));
			}
		}

		function loadData(url) {
			$
				.ajax({
					url: url,
					dataType: "json"
				})
				.success(dataLoaded)
				;
		}

		instance.$el = $el;

		instance.dataReady = function(callback) {
			return this.on('ready.data', callback);
		};

		instance.load = function(urls) {
			if (Array.isArray(urls)) {
				loadingQueue = urls;
			} else {
				loadingQueue.push(urls);
			}

			loadingQueue.forEach(loadData);

			return this;
		};

		instance.refresh = function(ms) {
			if (!ms) { refreshTimer = null; return; }

			refreshTimer = window.setTimeout(function() {
				window.location.reload();
			}, ms);
		}

		instance.jqplot = function(id, dataSets, options) {
			return Observer.jqplot(id, dataSets, options);
		};

		if (options.autoRefresh) {
			instance.refresh(options.refresh);
		}

		return instance;
	};
}(jQuery, Observer, window));
