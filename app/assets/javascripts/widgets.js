// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/spinner
//= require modules/sandbox
//= require modules/widget_preferences
//= require modules/widget_modifier
//= require modules/widget_resources
//= require modules/editable_name
//= require modules/widget_debugger
//= require modules/widget_editor
//= require modules/widget_meta_editor
//= require modules/widget_previewer
//= require modules/widget_builder
//= require modules/tabs

(function($, window, Observer, undefined) {
	'use strict';

	var modules = Observer.modules;

	Observer.onPageReady(['edit.widgets'], function() {
		modules.WidgetPreviewer.attachTo('[data-widget-previewer]', {
			$widgetForm: $('[data-widget-form]')
		});

		modules.Tabs.attachTo('[data-tabs]');

		modules.WidgetEditor.attachTo('[data-js-editor]');
		modules.WidgetEditor.attachTo('[data-yaml-editor]');
		modules.WidgetEditor.attachTo('[data-css-editor]');
		modules.WidgetEditor.attachTo('[data-html-editor]');
		modules.WidgetBuilder.attachTo('[data-widget-builder]');

		modules.EditableName.attachTo('[data-editable-name]');
		modules.WidgetPreferences.attachTo('[data-widget-preferences]');

		modules.widgetModifier($('[data-widget-modifier]'));
		modules.widgetResources($('[data-widget-resources]'));

		var d = modules.widgetDebugger($('[data-widget-debugger]'));

		$('[data-widget-preferences]').on('saved', function() {
			$(document).trigger('previewWidgetRequested');
		});

		Observer.on('saved', function(mode, value) {
			if (mode === 'yaml') {
				$('[data-widget-builder]').trigger('renderRequested', value);
			}
		});

		Observer
			.on('log', d.log)
			.on('reset.log', d.reset)
			;
	});

	Observer.onPageLoaded(['preview.widgets', 'show.widgets'], function() {
		var
			$el = $('.widget-group'),
			$window = $(window)
			;
		$el.css('width', $window.width());
		$el.css('height', $window.height());

		Observer.on('log', function (log) {
			window.parent.Observer.trigger('log', log);
		});
	});

}(jQuery, window, Observer));
