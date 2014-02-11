// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require modules/spinner
//= require modules/sandbox
//= require modules/widget_preferences
//= require modules/widget_modifier
//= require modules/widget_resources
//= require modules/editable_name
//= require modules/widget_debugger
//= require modules/widget_editor
//= require modules/widget_previewer
//= require modules/widget_editors_layout

(function($, window, Observer, undefined) {
	'use strict';

	var modules = Observer.modules;

	Observer.onPageReady(['edit.widgets'], function() {
		modules.WidgetPreviewer.attachTo('[data-widget-previewer]', {
			$widgetForm: $('[data-widget-form]')
		});

		modules.WidgetEditor.attachTo('[data-editor]');
		modules.WidgetEditorsLayout.attachTo('[data-widget-editor-layout]');
		modules.EditableName.attachTo('[data-editable-name]');
		modules.WidgetPreferences.attachTo('[data-widget-preferences]');

		modules.widgetModifier($('[data-widget-modifier]'));
		modules.widgetResources($('[data-widget-resources]'));

		var d = modules.widgetDebugger($('[data-widget-debugger]'));

		$('[data-widget-preferences]').on('saved', function() {
			$(document).trigger('previewWidgetRequested');
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
