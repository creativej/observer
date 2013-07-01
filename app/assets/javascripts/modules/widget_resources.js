(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetResources = function($el) {
		var
			instance = window.eventable({}),
			$modal = $('#' + $el.data('modal-id'))
			;

		Observer.Keyboard.addListener(instance);

		instance.hide = function() {
			$modal.foundation('reveal', 'close');
			return this;
		};

		instance.show = function() {
			$modal.foundation('reveal', 'open');
			return this;
		};

		var
			$items = $modal.find('[data-copy-token]'),
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
			instance.hide();
			instance.trigger('copied');
		});

		$modal.find('[data-cancel]').click(function() {
			instance.hide();
			return false;
		});

		$el.click(function() {
			instance.show();
			return false;
		});

		return instance;
	};
}(jQuery, Observer, window));
