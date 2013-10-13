//= require modules/widget_size_options
(function($, Observer, window) {
	'use strict';

	Observer.modules.widgetPreferences = function($el) {
        function findInput($el, name) {
            return $el.find('#widget_' + name);
        }

		var
			instance = window.eventable(),
			$modal = $('#' + $el.data('modal-id')),
			$save = $modal.find('[data-save]'),
			$cancel = $modal.find('[data-cancel]'),
			spinner = Observer.modules.spinner($modal.find('.spinner-container')),
			cached = {},
			$inputs = $modal.find('input'),
			widgetOptions = Observer.modules.widgetSizeOptions($modal.find('[data-size-options]')),
            $row = findInput($modal, 'row'),
            $col = findInput($modal, 'column')
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

		$modal.find('form').submit(function() {
			instance.save();
			return false;
		});

		$cancel.click(function() { instance.cancel(); return false; });

		instance.show = function() {
			$modal.foundation('reveal', 'open');
			cache($inputs);
		};

		instance.close = function() {
			$modal.foundation('reveal', 'close');
		};

		instance.save = function() {
			Observer.actions.postForm(
				$modal.find('form'),
				spinner
			).done(function() {
				instance.close();
				instance.trigger('save');
			});
		};

		instance.cancel = function() {
			this.close();
			instance.trigger('cancel');
		};

		widgetOptions.on('change', function(col, row) {
			$row.val(row);
			$col.val(col);
		});

		return instance;
	};
}(jQuery, Observer, window));
