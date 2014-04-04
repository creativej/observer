// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/ace_editor
//= require modules/spinner
//= require actions/post_to_url
//= require actions/post_form

(function($, window, Observer) {
	'use strict';

	var
		modules = Observer.modules,
		actions = Observer.actions
		;

	Observer.onPageReady(['edit.queries'], function() {
		var
			editor = modules.aceEditor($('.editor[rel="ace-editor"]')),
			spinner = modules.spinner(Observer.$spinner()),
			$queryForm = $('.query-form'),
			$runQueryBtn = $queryForm.find('.run-btn'),
			$resultContent = $('.result-content')
			;

		function runQuery() {
			actions.postToUrl(
				$runQueryBtn.data('url'),
				{
					spinner: spinner,
					data: {
						value: editor.val(),
						connection_id: $queryForm.find('#query_connection_id').val()
					},
					action: 'Executing query...'
				}
			).done(function(resp) {
				$resultContent.hide().html(resp).fadeIn('fast');
			});
		}

		function saveQuery() {
			actions
				.postForm($queryForm, spinner, { action: 'Saving query...' })
				.done(function() {
					editor.updateLastSavedValue();
				});
		}

		$runQueryBtn.click(function() {
			runQuery();
			return false;
		});

		window.onbeforeunload = function (e) {
			var
				message = "You still have unsaved content. Are you sure you want to leave this page",
				e = e || window.event;

			if (editor.hasUnsavedContent()) {
				// For IE and Firefox
				if (e) {
					e.returnValue = message;
				}
				// For Safari
				return message;
			}
		};

		$('.editor-group').find('.save-btn').click(function() {
			saveQuery();
		});

		editor
			.on('save.shortcut', function() {
				saveQuery();
			})
			.on('preview.shortcut', function() {
				runQuery();
			});

		if ($.trim(editor.val()) !== '') {
			runQuery();
		}

		Observer.modules.editableName($('.query-name'));
	});
}(jQuery, window, Observer));
