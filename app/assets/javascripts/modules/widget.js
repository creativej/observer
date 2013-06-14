(function($, Observer, window) {
	'use strict';

	Observer.modules.widget = function($el) {
		var instance = window.eventable(),
			dataSets = [],
			loadingQueue = [],
			refreshTimer
			;

		function dataLoaded(data) {
			dataSets.push(data);
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
			if (!ms) { refreshTimer = null; }

			refreshTimer = window.setTimeout(function() {
				window.location.reload();
			}, ms);
		}

		instance.jqplot = function(id, dataSets, options) {
			return Observer.jqplot(id, dataSets, options);
		};

		instance.refresh(100000); // Refresh every 10 minutes

		return instance;
	};
}(jQuery, Observer, window));
