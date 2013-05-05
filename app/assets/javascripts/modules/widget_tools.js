(function($, Observer, window) {
	'use strict';

	var eventable = window.eventable;

	var item = function($el) {
		var
			instance = eventable({})
			;

		$el.click(function() {
			instance.trigger('click');
		});

		instance.activate = function() {
			if ($el.length) {
				$el.addClass('active');
				$el.siblings('.content').addClass('active');
				return true;
			}
		};

		instance.deactivate = function() {
			if ($el.length) {
				$el.removeClass('active');
				$el.siblings('.content').removeClass('active');
				return true;
			}
		};

		instance.isActive = function() {
			return $el.hasClass('active');
		};

		return instance;
	};

	Observer.modules.widgetTools = function($el) {
		var
			instance = eventable({}),
			$instance = $({}),
			$items = $el.find('.item'),
			items = [],
			previousItem
			;

		items = $items.find('.icon').map(function() {
			var currentItem = item($(this));

			currentItem.on('click', function() {
				if (currentItem.isActive()) {
					currentItem.deactivate();
				} else {
					if (previousItem && previousItem !== currentItem) {
						previousItem.deactivate();
					}

					currentItem.activate();
				}

				previousItem = currentItem;
			});

			return currentItem;
		});

		return instance;
	};

}(jQuery, Observer, window));
