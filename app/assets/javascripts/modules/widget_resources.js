(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetResources = function($el) {
		var
			instance = window.eventable({})
			;

		Observer.Keyboard.addListener(instance);

		instance.hide = function() {
			$el.removeClass('active');
			this.focus = false;
			return this;
		};

		instance.show = function() {
			$el.addClass('active');
			this.focus = true;
			return this;
		};

		var
			$items = $el.find('.copy-token'),
			clip = new window.ZeroClipboard($items)
			;

		clip.on('mouseover', function(client, args) {
			$items.removeClass('hover');
			$(this).addClass('hover');
		});

		clip.on('mouseout', function() {
			$items.removeClass('hover');
			$(this).removeClass('hover');
		});

		clip.on('complete', function() {
			instance.trigger('copied');
		});

		$el.find('.query-edit').click(function() {
			window.location = $(this).data('url');
		});
		$el.find('.close-resources').click(function() {
			instance.trigger('close.click');
		});
		return instance;
	};
}(jQuery, Observer, window));
