(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetPreferences = function($el) {
		var
			instance = window.eventable(),
			$modal = $('#' + $el.data('modal-id')),
			$save = $modal.find('[data-save]'),
			$cancel = $modal.find('[data-cancel]'),
			spinner = Observer.modules.spinner($modal.find('.spinner-container')),
			cached = {},
			$inputs = $modal.find('input')
			;

		function cache($inputs) {
			$inputs.each(function() {
				var $input = $(this);
				cached[$input.prop('name')] = $input.val();
			});
		}

		$modal.foundation('reveal', {
			opened: function() {
				instance.trigger('opened');
			},
			closed: function() {
				$inputs.each(function() {
					var $this = $(this);
					$this.val(cached[$this.prop('name')]);
				});
				instance.trigger('closed');
			}
		});

		$el.click(function() {
			instance.show();
			return false;
		});

		$save.click(function() { instance.saveAttribute(); return false; });
		$cancel.click(function() { instance.cancel(); return false; });

		instance.show = function() {
			$modal.foundation('reveal', 'open');
			cache($inputs);
		};

		instance.close = function() {
			$modal.foundation('reveal', 'close');
		}

		instance.saveAttribute = function() {
			Observer.actions.saveAttribute(
				$modal.data('url'),
				spinner,
				$inputs.serialize()
			).done(function() {
				instance.close();
				instance.trigger('save');
			});
		};

		instance.cancel = function() {
			this.close();
			instance.trigger('cancel');
		};

		return instance;
	};
}(jQuery, Observer, window));
