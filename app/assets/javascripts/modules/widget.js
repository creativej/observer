(function($, Observer, window) {
	'use strict';

	Observer.modules.widget = function($el) {
		var instance = window.eventable(),
			dataSets = [],
			loadingQueue = []
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

		instance.jqplot = function(id, dataSets, options) {
			return Observer.jqplot(id, dataSets, options);
		};

		return instance;
	};
}(jQuery, Observer, window));
