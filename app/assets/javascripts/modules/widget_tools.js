(function($, Observer, window) {
	'use strict';

	var eventable = window.eventable;

	var item = function($el) {
		var
			instance = eventable()
			;

		$el.click(function() {
			instance.trigger('click');
		});

		instance.id = $el.data('id');

		instance.activate = function() {
			if ($el.length) {
				$el.addClass('active');
				this.trigger("activate", this.id);
			}
		};

		instance.deactivate = function() {
			if ($el.length) {
				$el.removeClass('active');
				this.trigger('deactivate', this.id);
			}
		};

		instance.isActive = function() {
			return $el.hasClass('active');
		};

		return instance;
	};

	Observer.modules.widgetTools = function($el) {
		var
			instance = eventable(),
			$instance = $({}),
			$items = $el.find('.item'),
			items = [],
			previousItem,
			tools = {
				preferences: Observer.modules.widgetPreferences($el.find('.preferences .content'))
			}
			;

		tools.preferences
			.on('cancel', function() {
				instance.deactivate('preferences');
			}).on('save', function() {
				instance.deactivate('preferences');
				instance.trigger('save.preferences');
			})
			;

		$items.find('.icon').each(function() {
			var currentItem = item($(this));

			currentItem
				.on('activate', function(id) {
					previousItem = currentItem;
					if (tools[id]) { tools[id].show(); }
				})
				.on('deactivate', function(id) {
					if (tools[id]) { tools[id].hide(); }
				});

			currentItem.on('click', function() {
				if (currentItem.isActive()) {
					currentItem.deactivate();
				} else {
					if (previousItem && previousItem !== currentItem) {
						previousItem.deactivate();
					}

					currentItem.activate();
				}
			});

			items.push(currentItem);
		});

		instance.deactivate = function(name) {
			items.find(function(item) {
				return item.id === name;
			}).deactivate();
		};

		return instance;
	};

}(jQuery, Observer, window));
