(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetPreferences = function($el) {
		var
			instance = window.eventable(),
			$save = $el.find('.save'),
			$cancel = $el.find('.cancel'),
			spinner = Observer.modules.spinner($el.find('.spinner-container')),
			cached = {},
			$inputs = $el.find('input')
			;

		function cache($inputs) {
			$inputs.each(function() {
				var $input = $(this);
				cached[$input.prop('name')] = $input.val();
			});
		}

		Observer.Keyboard.addListener(instance);

		instance.on('esc.keyup', function() {
			instance.cancel();
		});

		instance.on('enter.keypress', function() {
			instance.saveAttribute();
		});

		Observer.Keyboard
			.keypress('enter', $cancel, function() {
				instance.cancel();
			})
			.keypress('enter', $save, function() {
				instance.saveAttribute();
			})
			;

		$save.click(function() { instance.saveAttribute(); });
		$cancel.click(function() { instance.cancel(); });

		instance.hide = function() {
			$el.removeClass('active');
			this.focus = false;
			return this;
		};

		instance.show = function() {
			$el.addClass('active');
			cache($inputs);
			this.focus = true;
			return this;
		};

		instance.saveAttribute = function() {
			Observer.actions.saveAttribute(
				$el.data('url'),
				spinner,
				$inputs.serialize()
			).done(function() {
				instance.trigger('save');
			});
		};

		instance.cancel = function() {
			$inputs.each(function() {
				var $this = $(this);
				$this.val(cached[$this.prop('name')]);
			});
			instance.trigger('cancel');
		};

		return instance;
	};
}(jQuery, Observer, window));
