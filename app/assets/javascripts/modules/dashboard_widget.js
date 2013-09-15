//= require actions/remove_widget_from_dashboard
//= require modules/widget_modifier
(function($, window, Observer, undefined) {
	'use strict';

	Observer.modules.dashboardWidget = function($el) {
		var
			instance = window.eventable({
				isLoaded: false
			}),
			$iframe = $el.find('iframe')
			;

		var modifier = Observer.modules.widgetModifier($el.find('[data-widget-modifier]'));

		modifier.on('clicked.remove', function() {
			Observer.actions.removeWidgetFromDashboard(
				$el.data('remove-url'),
				$el.data('id')
			).done(function() {
				instance.trigger('removed', $el[0]);
			});
		});

		instance.load = function() {
			$iframe.prop('src', $el.data('url'));
			$iframe.on('load', function() {
				instance.isLoaded = true;
				instance.trigger('loaded');
			});
		}

		return instance;
	};

}(jQuery, window, Observer));
