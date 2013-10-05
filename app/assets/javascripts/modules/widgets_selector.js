//
(function($, Observer, window) {
	Observer.modules.widgetSelector = function($el) {
		var instance = window.eventable();

		$el.find('[data-item]').click(function() {
			instance.trigger('click.item', $(this));
		});

		return instance;
	};
}(jQuery, Observer, window));
