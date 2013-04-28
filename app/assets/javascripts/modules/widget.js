//
(function($, TheObserver, window) {
	'use strict';

	TheObserver.modules.widget = function($el) {
		var widget = {},
			$widget = $(widget),
			dataSets = [],
			loadingQueue = []
			;


		function dataLoaded(data) {
			dataSets.push(data);

			if (dataSets.length === loadingQueue.length) {
				$widget.trigger('ready.data', dataSets);
			}
		}

		function loadData(url) {
			$
				.ajax(url)
				.done(dataLoaded)
				;
		}

		widget.on = function(name, callback) {
			$widget.on(name, callback);
			return this;
		};

		widget.load = function(urls) {
			if (Array.isArray(urls)) {
				loadingQueue = urls;
			} else {
				loadingQueue.push(urls);
			}

			loadingQueue.forEach(loadData);

			return this;
		};

		return widget;
	};
}(jQuery, TheObserver, window));
