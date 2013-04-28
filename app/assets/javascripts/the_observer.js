(function($, window) {
	"use strict";

	window.TheObserver = function Application($) {
		var
			instance = {
				modules: {},
				helpers: {}
			},
			$instance = $(instance)
			;

		function pageNamespace(name) {
			return name + '.' + $('#app_body').data('triggerjs');
		}

		instance.onPageReady = function(page, callback) {
			if (Array.isArray(page)) {
				page.forEach(function(p) {
					$instance.on('ready.' + p ,callback);
				});
			} else {
				$instance.on('ready.' + page ,callback);
			}
		};

		instance.onPageLoaded = function(page, callback) {
			if (Array.isArray(page)) {
				page.forEach(function(p) {
					$instance.on('loaded.' + p ,callback);
				});
			} else {
				$instance.on('loaded.' + page ,callback);
			}
		};

		instance.triggerPageReady = function(name, data) {
			return $instance.trigger(pageNamespace('ready'), data);
		};

		instance.triggerPageLoaded = function(name, data) {
			return $instance.trigger(pageNamespace('loaded'), data);
		};

		instance.on = function(name, callback) {
			$instance.on(name, callback);
			return this;
		};

		instance.trigger = function(name, data) {
			$instance.trigger(name, data);
			return this;
		};

		return instance;
	}($);
}(jQuery, window));
