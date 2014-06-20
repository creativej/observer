// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/widgets_selector
//= require modules/dashboard_preferences
//= require modules/dashboard_fullscreen_switcher
//= require modules/dashboard_widgets
//= require actions/save_widget_to_dashboard
//= require actions/update_dashboard_widgets
//= require jquery.transit/jquery.transit.js
//= require modules/widget_builder
//
(function($, window, Observer, undefined) {
    'use strict';

    var
        modules = Observer.modules,
        actions = Observer.actions
        ;

    Observer.onPageReady(['new_widget.dashboards'], function() {
        var
            $dashboardWidgets = $('[data-dashboard-widgets]'),
            $widgetBuilder = $('[data-widget-builder]'),
            $previewer = $('[data-widget-previewer]');

        modules.WidgetBuilder.attachTo($widgetBuilder);
        modules.WidgetPreviewer.attachTo($previewer);
        modules.DashboardWidgets.attachTo($dashboardWidgets);

        $dashboardWidgets.on('change', function(e, data) {
            $previewer.trigger('idleRequested');
            $widgetBuilder
                .trigger('renderRequested', data.meta)
                .trigger('updatePreviewDataRequested', data)
                ;
        });

        $dashboardWidgets.trigger('activateFirstItemRequested');
    });

    Observer.onPageReady(['view.dashboards'], function() {
        var
            $dashboard = $('.dashboard.gridster'),
            dashboard = modules.dashboard($dashboard, {
                disable: true
            }),
            $body = $('body'),
            $window = $(window),
            originalWidth = $dashboard.width(),
            originalHeight = $dashboard.height()
            ;

        $window.resize(function() {
            if ($window.width() < 1200 || $window.width() > 1600) {
                var
                    scaleX = $window.width() / (originalWidth + 50),
                    scaleY = $window.height() / (originalHeight)
                    ;

                var t = {
                    width: $window.width() + 'px',
                    scale: [scaleX, scaleX]
                };
                $body.css('overflow-x', 'hidden');
                $dashboard
                    .css(t);
            } else {
                $body.css('overflow-x', 'auto');
                $dashboard
                    .css({
                        width: originalWidth + 'px',
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
