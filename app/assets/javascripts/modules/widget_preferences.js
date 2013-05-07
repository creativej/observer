(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetPreferences = function($el) {
		var
			instance = window.eventable({}),
			$save = $el.find('.save'),
			$cancel = $el.find('.cancel'),
			spinner = Observer.modules.spinner($el.find('.spinner-container'))
			;

		function isEnter(e) {
			return e.keyCode === 13;
		}

		$save.keypress(function(e) {
			if (isEnter(e)) {
				instance.saveAttribute();
			}
		});

		$cancel.keypress(function(e) {
			if (isEnter(e)) {
				instance.cancel();
			}
		});

		$save.click(function() { instance.saveAttribute(); });
		$cancel.click(function() { instance.cancel(); });

		instance.hide = function() {
			$el.removeClass('active');
			return this;
		};

		instance.show = function() {
			$el.addClass('active');
			return this;
		};

		instance.saveAttribute = function() {
			Observer.actions.saveAttribute(
				$el.data('url'),
				spinner,
				$el.find('input').serialize()
			).done(function() {
				instance.trigger('save');
			});
		};

		instance.cancel = function() {
			instance.trigger('cancel');
		};

		return instance;
	};
}(jQuery, Observer, window));
