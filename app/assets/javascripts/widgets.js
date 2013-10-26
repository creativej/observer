// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require actions/save_attribute
//= require modules/spinner
//= require modules/sandbox
//= require modules/widget_preferences
//= require modules/widget_modifier
//= require modules/widget_resources
//= require modules/editable_name
//= require modules/widget_debugger
//= require modules/widget_editor

(function($, window, Observer, undefined) {
	'use strict';

	var modules = Observer.modules;

	function previewWidget(sandbox) {
		var
			$hiddenFields = $('.widget-form')
				.find('input[type="hidden"]'),
			$form = $('.preview-widget-form')
			;

		sandbox.resize(
			parseInt($('#widget_row').val(), 10),
			parseInt($('#widget_column').val(), 10)
		);

		$form.html($hiddenFields.clone().prop('id', undefined).hide());
		sandbox.prepareToLoad(function() {
			$form.submit();
		});
	}

	Observer.onPageReady(['edit.widgets'], function() {
		var
			$editorLayout = $('#widget-editor-layout'),
			$previewContainer = $('.preview-container'),
			spinner = modules.spinner(
				$previewContainer.find('.spinner-container')
			),
			sandbox = modules.sandbox($('.widget-sandbox'), spinner)
			;

		sandbox.on('resized', function() {
			$previewContainer.width(this.width());
			$previewContainer.height(this.height());
		});

		var
			$editorGroups =  $('.editor-group'),
			jsEditor = modules.widgetEditor($editorGroups.filter('.js')),
			htmlEditor = modules.widgetEditor($editorGroups.filter('.html')),
			cssEditor = modules.widgetEditor($editorGroups.filter('.css'));

		previewWidget(sandbox);

		modules.widgetPreferences($('[data-widget-preferences]'))
			.on('save', function() {
				previewWidget(sandbox);
			});
		modules.widgetModifier($('[data-widget-modifier]'));
		modules.widgetResources($('[data-widget-resources]'));
		modules.editableName($('.widget-name'));

		var d = modules.widgetDebugger($('[data-widget-debugger]'));

		Observer
			.on('htmlModeRequested', function() {
				$editorLayout
					.removeAttr('data-scss-mode')
					.attr('data-html-mode', true);
			})
			.on('scssModeRequested', function() {
				$editorLayout
					.removeAttr('data-html-mode')
					.attr('data-scss-mode', true);
			})
			.on('previewWidgetRequested', function() {
				previewWidget(sandbox);
			})
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
