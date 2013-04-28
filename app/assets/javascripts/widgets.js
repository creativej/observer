// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
(function($, window, TheObserver, undefined) {
	'use strict';

	function previewWidget() {
		var $hiddenFields = $('.widget-form').find('input[type="hidden"]');

		$('.preview-widget-form').html($hiddenFields.clone().prop('id', undefined));
		$('.preview-widget-form').submit();
	}

	TheObserver.onPageReady(['edit.widgets', 'create.widgets'], function() {
		$('.editor[rel="ace-editor"]').each(function() {
			TheObserver.modules.aceEditor($(this));
		});

		$('.button.preview').click(function() {
			previewWidget();
			return false;
		});

		previewWidget();
	});

	TheObserver.onPageReady('preview.widgets', function() {
		var $el = $('.widget-preview');
		var dimensions = $el.data('dimensions');
		var width = dimensions[0] * parseInt($el.data('sizex'), 10);
		var height = dimensions[1] * parseInt($el.data('sizey'), 10);
		$el.css('width', width);
		$el.css('height', height);
	});

}(jQuery, window, TheObserver));
