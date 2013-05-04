//
(function($, Observer, window) {
	Observer.modules.spinner = function($el, cls) {
		cls = cls || 'show';

		return {
			hide: function() {
				$el.removeClass(cls);
			},
			show: function() {
				$el.addClass(cls);
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
