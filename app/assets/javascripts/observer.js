(function($, window) {
	"use strict";

	window.Observer = function Application($) {
		var
			instance = {
				modules: {},
				helpers: {},
				actions: {},
				mixins: {}
			}
			;

		instance = window.eventable(instance);

		function pageNamespace(name) {
			return name + '.' + $('#app_body').data('triggerjs');
		}

		window.ZeroClipboard.setDefaults({
			moviePath: '/assets/ZeroClipboard.swf'
		});

		instance.onPageReady = function(page, callback) {
			if (Array.isArray(page)) {
				page.forEach(function(p) {
					instance.on('ready.' + p ,callback);
				});
			} else {
				instance.on('ready.' + page ,callback);
			}
		};

		instance.onPageLoaded = function(page, callback) {
			if (Array.isArray(page)) {
				page.forEach(function(p) {
					instance.on('loaded.' + p ,callback);
				});
			} else {
				instance.on('loaded.' + page ,callback);
			}
		};

		instance.triggerPageReady = function(name, data) {
			return instance.trigger(pageNamespace('ready'), data);
		};

		instance.triggerPageLoaded = function(name, data) {
			return instance.trigger(pageNamespace('loaded'), data);
		};

		return instance;
	}($);
}(jQuery, window));
