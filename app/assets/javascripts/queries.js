// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require modules/run_query_button


(function($, window, Observer) {
	'use strict';

	Observer.onPageReady(['new.queries', 'edit.queries'], function() {
		var editor = Observer.modules.aceEditor($('#query-editor'));

		if (editor) {
			var runQueryBtn = Observer.modules.runQueryButton(
				$('.query-form').find('.run-btn'),
				editor
			);

			runQueryBtn.on('success.post', function(resp) {
				$('.result-content').hide().html(resp).fadeIn('fast');
			});
		}
	});
}(jQuery, window, Observer));
