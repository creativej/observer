// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/widgets_selector
//= require modules/dashboard_preferences
//= require actions/save_widget_to_dashboard
//= require actions/update_dashboard_widgets
//
(function($, window, Observer, undefined) {
	'use strict';

	var
		modules = Observer.modules,
		actions = Observer.actions
		;

	Observer.onPageReady(['edit.dashboards'], function() {
		var
			$dashboard = $('.dashboard.gridster'),
			dashboard = modules.dashboard($dashboard),
			dashboardPreferences = modules.dashboardPreferences(
				$('#dashboard-preferences'),
				{ model: 'dashboard' }
			),
			$widgetSelector = $('#widgets-selector'),
			widgets = modules.widgetSelector($widgetSelector)
			;

		dashboard.on('added.widget', function(data, widget) {
			var saveWidget = actions.saveWidgetToDashboard(
				$widgetSelector.data('url'),
				data
			);

			saveWidget.done(function(resp) {
				$(widget).attr('data-id', resp.id);
			});
		});

		dashboard.on('moved.widgets', function(widgets) {
			actions.updateDashboardWidgets(
				$dashboard.data('update-url'),
				widgets
			);
		});

		widgets.on('click.item', function($item) {
			var $sandbox = $item.find('.widget-sandbox').clone();
			$sandbox.data('widget-id', $item.data('id'));

			dashboard.addWidget(
				$sandbox,
				$item
			);
			$sandbox.prop('src', $item.data('url'));
			$widgetSelector.foundation('reveal', 'close');
		});
	});

}(jQuery, window, Observer));
