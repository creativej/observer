// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
(function($, window, TheObserver) {
	'use strict';

	TheObserver.on('ready.body', function() {
		$('.editor[rel="ace-editor"]').each(function() {
			TheObserver.modules.aceEditor($(this));
		});
	});
}(jQuery, window, TheObserver));
