//= require actions/post_form
(function($, Observer, window) {
	'use strict';


	Observer.modules.dashboardPreferences = function($el, options) {
		function findInput($el, name) {
			return $el.find('#' + options.model + '_' + name);
		}

		var
			instance = window.eventable(),
			$name = findInput($el, 'name'),
			$width = findInput($el, 'width'),
			$height = findInput($el, 'height'),
			$screenOptions = $el.find('[data-screen-option]'),
			originalValues = {},
			$cancel = $el.find('.close-reveal-modal'),
			savePromise
			;

		instance.close = function() {
			$el.foundation('reveal', 'close');
		};

		instance.save = function() {
			savePromise = Observer.actions.postForm(
				$el.find('.edit_dashboard'),
				Observer.modules.spinner($el.find('.spinner-container'))
			);

			savePromise.done(function() {
				instance.saved = true;
				instance.close();
			});
		};

		$el.foundation('reveal', {
			open: function() {
				originalValues.name = $name.val();
				instance.saved = false;
			},
			closed: function() {
				if (!instance.saved) {
					$name.val(originalValues.name);
				}
			}
		});

		$el.submit(function() {
			instance.save();
			return false;
		});

		$el.find('.cancel-dashboard-action').click(instance.close);

		$screenOptions.click(function() {
			$screenOptions.removeClass('selected');
			var $selected = $(this);
			$selected.addClass('selected');

			$width.val($selected.data('width'));
			$height.val($selected.data('height'));
		});

		return instance;
	};

}(jQuery, Observer, window));
