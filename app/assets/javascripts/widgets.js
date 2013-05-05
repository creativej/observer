// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require actions/save_attribute
//= require modules/spinner
//= require modules/widget_tools
//= require modules/sandbox
(function($, window, Observer, undefined) {
	'use strict';

	var modules = Observer.modules;

	function previewWidget(sandbox) {
		var
			$hiddenFields = $('.widget-form')
				.find('input[type="hidden"], input[name="column"], input[name="row"]'),
			$form = $('.preview-widget-form')
			;

		$form.html($hiddenFields.clone().prop('id', undefined).hide());
		sandbox.prepareToLoad(function() {
			$form.submit();
		});
	}

	Observer.onPageReady(['edit.widgets', 'create.widgets'], function() {
		var
			spinner = modules.spinner(
				$('.preview-container').find('.spinner-container')
			),
			sandbox = modules.sandbox($('#widget-sandbox'), spinner)
			;

		$('.editor-wrapper').each(function() {
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

		var widgetTools = modules.widgetTools($('.widget-tools'));
	});

	Observer.onPageReady('preview.widgets', function() {
		var $el = $('.widget-preview');
		var dimensions = $el.data('dimensions');
		var width = dimensions[0] * parseInt($el.data('sizex'), 10);
		var height = dimensions[1] * parseInt($el.data('sizey'), 10);
		$el.css('width', width);
		$el.css('height', height);
	});

}(jQuery, window, Observer));
