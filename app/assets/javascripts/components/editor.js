(function($, ace, window) {
	'use strict';

	var localStorage = window.localStorage;

	$(function() {
		if (!$('#editor').length) {
			return;
		}

		var
			$form = $('.query-form'),
			$value = $('#query_value'),
			$resultContainer = $form.find('.result-content'),
			editor = ace.edit("editor"),
			cachedValue
			;
		editor.getSession().setMode("ace/mode/sql");

		if ($value.val().trim()) {
			editor.setValue($value.val());
		} else if (!$value.val().trim() && localStorage.getItem('content.editor')) {
			cachedValue = localStorage.getItem('content.editor');
			editor.setValue(cachedValue);
			$value.val(cachedValue);
		}

		editor.on('change', function(e){
			localStorage.setItem('content.editor', editor.getValue());
			$value.val(editor.getValue());
		});

		$('.run-btn').on('click', function() {
			$value.val(editor.getValue());

			$.post($form.data('run-url'), { value: $value.val() })
				.done(function(resp) {
					$resultContainer
						.hide()
						.html(resp)
						.fadeIn('fast')
						;
				})
				.fail(function() {
					window.alert('query failed');
				})
				;
			return false;
		});
	});
}(jQuery, ace, window));
