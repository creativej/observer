(function($, window, Observer, document) {
	'use strict';

	Observer.Keyboard = function() {
		var
			instance = window.eventable(),
			$body = $(document),
			listeners = []
			;

		instance.keys = {
			13: 'enter',
			27: 'esc'
		};

		function trigger(type, keyCode, obj) {
			var match = instance.keys[keyCode];

			if (!obj.focus)
				return;

			if (match) {
				obj.trigger(match+'.key'+type);
			}
		}

		function callback(name, keyCode, fn) {
			var match = instance.keys[keyCode];

			if (match === name) {
				return fn.apply();
			}
		}

		$body.keypress(function(e) {
			listeners.each(function(obj) {
				trigger('press', e.keyCode, obj);
			});
		});

		$body.keyup(function(e) {
			listeners.each(function(obj) {
				trigger('up', e.keyCode, obj);
			});
		});

		instance.addListener = function(obj) {
			listeners.push(obj);
			return this;
		};

		instance.removeListener = function(obj) {
			listeners.remove(obj);
		};

		instance.keypress = function(name, $el, fn) {
			$el.keypress(function(e) {
				return callback(name, e.keyCode, fn);
			});

			return this;
		};

		instance.keyup = function(name, $el, fn) {
			$el.keyup(function(e) {
				return callback(name, e.keyCode, fn);
			});

			return this;
		};

		return instance;
	}();

}(jQuery, window, Observer, document));
