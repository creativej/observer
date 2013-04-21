// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require modules/run_query_button


(function($, window, TheObserver) {
	'use strict';

	TheObserver.on('ready.body', function() {
		var editor = TheObserver.modules.aceEditor($('#query-editor'));

		if (editor) {
			var runQueryBtn = TheObserver.modules.runQueryButton(
				$('.query-form').find('.run-btn'),
				editor
			);

			runQueryBtn.on('success.post', function(e, resp) {
				$('.result-content').hide().html(resp).fadeIn('fast');
			});
		}
	});
}(jQuery, window, TheObserver));
