//
(function($, Observer, window) {
	Observer.modules.sandbox = function($el, spinner) {
		var
			instance = window.eventable({}),
			dimensions = $el.data('dimensions')
			;

		function sandbox() {
			return $el.get(0).contentDocument;
		}

		instance.resize = function(row, column) {
			$el.css('width', column * dimensions[0]);
			$el.css('height', row * dimensions[1]);

			instance.trigger('resized', this);
		};

		instance.prepareToLoad = function(callback) {
			spinner.show();
			$el.show().animate({
				opacity: 0
			}, 'fast', callback);
		};

		instance.width = function() {
			return $el.width();
		};

		instance.height = function() {
			return $el.height();
		};

		$el.load(function() {
			spinner.hide();

			$el.show().animate({
				opacity: 1
			}, 'fast');

			instance.trigger('load');
		});

		return instance;
	};
}(jQuery, Observer, window));
