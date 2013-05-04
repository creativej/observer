//
(function($, Observer, window) {
	Observer.modules.sandbox = function($el, options) {
		var
			instance = {}
			;
		options = options || {};

		options = $.extend({
		}, options);

		function sandbox() {
			return $el.get(0).contentDocument;
		}

		$el.load(function() {
			// console.log($(sandbox()).height());
			$el.show().animate({
				opacity: 1,
				height: $(sandbox()).height()
			}, 'fast');
		});

		return instance;
	};
}(jQuery, Observer, window));
