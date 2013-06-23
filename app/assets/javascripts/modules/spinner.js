//
(function($, Observer, window) {
	Observer.modules.spinner = function($el, cls) {
		var $action = $el.find('.spinner-action');

		cls = cls || 'show';

		return {
			hide: function() {
				$el.removeClass(cls);
			},
			show: function(text) {
				$action.empty();
				$el.addClass(cls);

				if (text) {
					$action.text(text);
				}
			},
			toggle: function() {
				if ($el.hasClass(cls)) {
					this.hide();
				} else {
					this.show();
				}
			}
		};
	};
}(jQuery, Observer, window));
