// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/widgets_selector
//= require modules/dashboard_preferences
//= require modules/dashboard_fullscreen_switcher
//= require actions/save_widget_to_dashboard
//= require actions/update_dashboard_widgets
//= require jquery.transit/jquery.transit.js
//
(function($, window, Observer, undefined) {
	'use strict';

	var
		modules = Observer.modules,
		actions = Observer.actions
		;

	Observer.onPageReady(['view.dashboards'], function() {
		var
			$dashboard = $('.dashboard.gridster'),
			dashboard = modules.dashboard($dashboard, {
				disable: true
			}),
			$window = $(window),
			originalWidth = $('.dashboard.gridster').width(),
			originalHeight = $('.dashboard.gridster').height()
			;

		$window.resize(function() {
			if ($window.width() < 1200 || $(window).width() > 1600) {
				var
					scaleX = $window.width() / originalWidth,
					diffX = originalWidth - (scaleX * originalWidth),
					diffY = originalHeight - (scaleX * originalHeight)
					;

				var t = {
					x: -(diffX/4) + 'px',
					y: -(diffY/4) + 'px',
					scale: [scaleX, scaleX]
				};

				console.log(t);

				$('.dashboard.gridster')
					.width($(window).width())
					.css(t);
			} else {
				$('.dashboard.gridster')
					.width(1320)
					.css({
						x: '0px',
						y: '0px',
						scale: [1, 1]
					});
			}
		});
	});

	Observer.onPageReady(['edit.dashboards'], function() {
		var
			$dashboard = $('.dashboard.gridster'),
			dashboard = modules.dashboard($dashboard),
			dashboardPreferences = modules.dashboardPreferences(
				$('#dashboard-preferences'),
				{ model: 'dashboard' }
			),
			fullScreenSwitcher = modules.dashboardFullScreenSwitcher($('.monitor-fullscreen')),
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
			$widgetSelector.foundation('reveal', 'close');
		});
	});

}(jQuery, window, Observer));
