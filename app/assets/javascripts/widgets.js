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
//= require canjs/can.jquery

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

		$('.editor-group').each(function() {
			var
				$component = $(this),
				$spinner = $component.find('.spinner-container'),
				$editor = $component.find('.editor[rel="ace-editor"]'),
				$saveBtn = $component.find('.save-btn'),
				spinner = modules.spinner($spinner),
				editor = modules.aceEditor($editor)
				;

				function save() {
					Observer.actions.saveAttribute(
						$saveBtn.data('url'),
						spinner,
						editor.serialize()
					).done(function() {
						// previewWidget(sandbox);
					});
				}

				editor.on('save.shortcut', save);
				editor.on('preview.shortcut', function() { previewWidget(sandbox); });
				$saveBtn.click(save);
		});

		$('.button.preview').click(function() {
			previewWidget(sandbox);
			return false;
		});

		previewWidget(sandbox);

		var $tools = $('.widget-tools');

		var preferences = modules.widgetPreferences($('[data-widget-preferences]'));
		preferences.on('save', function() {
			previewWidget(sandbox);
		});
		var modifier = modules.widgetModifier($('[data-widget-modifier]'));
		var resources = modules.widgetResources($('[data-widget-resources]'));

		modules.editableName($('.widget-name'));
	});

	Observer.onPageLoaded(['preview.widgets', 'show.widgets'], function() {
		var $el = $('.widget-group');
		$el.css('width', $(window).width());
		$el.css('height', $(window).height());
	});

}(jQuery, window, Observer));
