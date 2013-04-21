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
