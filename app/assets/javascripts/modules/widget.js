(function($, Observer, window) {
	'use strict';

	Observer.modules.widget = function($el) {
		var instance = window.eventable({}),
			dataSets = [],
			loadingQueue = []
			;

		function dataLoaded(data) {
			var returnData;
			dataSets.push(data);

			if (dataSets.length === loadingQueue.length) {
				if (dataSets.length === 1) {
					returnData = dataSets[0];
				} else {
					returnData = dataSets;
				}

				instance.trigger('ready.data', returnData);
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

		return instance;
	};
}(jQuery, Observer, window));
