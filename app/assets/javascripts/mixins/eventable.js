(function($, window) {
	'use strict';

	window.eventable = function(obj) {
		var events = {};

		obj.on = function(name, fn) {
			events[name] = events[name] || [];
			events[name].push(fn);
			return obj;
		};

		obj.off = function(name, fn) {
			if(!(name in events)) { return; }
			events.splice(events[name].indexOf(fn), 1);
			return obj;
		};

		obj.trigger = function(name) {
			if(!(name in events)) { return; }

			for(var i = 0; i < events[name].length; i++){
				events[name][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
			return obj;
		};

		return obj;
	};
}($, window));
