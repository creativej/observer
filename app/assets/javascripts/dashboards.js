// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/widgets_selector
//= require modules/dashboard_preferences
//= require actions/save_dashboard
//
(function($, window, Observer, undefined) {
	'use strict';

	var modules = Observer.modules;

	Observer.onPageReady(['edit.dashboards'], function() {
		var
			dashboard = modules.dashboard($('.dashboard.gridster')),
			dashboardPreferences = modules.dashboardPreferences(
				$('#dashboard-preferences'),
				{ model: 'dashboard' }
			),
			$widgetSelector = $('#widgets-selector'),
			widgets = modules.widgetSelector($widgetSelector)
			;

		dashboard.on('added.widget', function(widgets) {
			Observer.actions.saveDashboard(
				$('.edit_dashboard').prop('action'),
				widgets
			);
		});

		widgets.on('click.item', function($item) {
			var $sandbox = $item.find('.widget-sandbox').clone();
			$sandbox.data('widget-id', $item.data('id'));
			$sandbox = $sandbox.prop('src', $item.data('url')).wrap('<li />').parent();
			dashboard.addWidget(
				$sandbox.get(0),
				$item.data('col'),
				$item.data('row')
			);
			$widgetSelector.foundation('reveal', 'close');
		});
	});

}(jQuery, window, Observer));
