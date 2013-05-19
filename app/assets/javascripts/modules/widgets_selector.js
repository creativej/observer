//
(function($, Observer, window) {
	Observer.modules.widgetSelector = function($el) {
		var instance = window.eventable();

		$el.find('.widgets-selector-item').click(function() {
			instance.trigger('click.item', $(this));
		});

		return instance;
	};
}(jQuery, Observer, window));
