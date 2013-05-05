//
(function($, Observer, window) {
	Observer.modules.sandbox = function($el, spinner) {
		var
			instance = window.eventable({})
			;

		function sandbox() {
			return $el.get(0).contentDocument;
		}

		instance.prepareToLoad = function(callback) {
			spinner.show();
			$el.show().animate({
				opacity: 0
			}, 'fast', callback);
		};

		$el.load(function() {
			spinner.hide();

			$el.show().animate({
				opacity: 1,
				height: $(sandbox()).height()
			}, 'fast');

			instance.trigger('load');
		});

		return instance;
	};
}(jQuery, Observer, window));
