// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require modules/sandbox
(function($, window, Observer, undefined) {
	'use strict';

	function previewWidget() {
		var $hiddenFields = $('.widget-form').find('input[type="hidden"], input[name="column"], input[name="row"]');
		$('.preview-widget-form').html($hiddenFields.clone().prop('id', undefined).hide());
		$('.preview-widget-form').submit();
	}

	Observer.onPageReady(['edit.widgets', 'create.widgets'], function() {
		$('.editor[rel="ace-editor"]').each(function() {
			Observer.modules.aceEditor($(this));
		});

		$('.button.preview').click(function() {
			previewWidget();
			return false;
		});

		var sandbox = Observer.modules.sandbox($('#widget-sandbox'));

		previewWidget();
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
