(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetPreferences = function($el) {
		var
			instance = window.eventable({}),
			$save = $el.find('.save'),
			$cancel = $el.find('.cancel'),
			spinner = Observer.modules.spinner($el.find('.spinner-container'))
			;

		$save.click(function() {
			Observer.actions.saveAttribute(
				$el.data('url'),
				spinner,
				$el.find('input').serialize()
			).done(function() {
				instance.trigger('save');
			});
		});

		$cancel.click(function() {
			instance.trigger('cancel');
		});

		instance.hide = function() {
			$el.removeClass('active');
			return this;
		};

		instance.show = function() {
			$el.addClass('active');
			return this;
		};

		return instance;
	};
}(jQuery, Observer, window));
