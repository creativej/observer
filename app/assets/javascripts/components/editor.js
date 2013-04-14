//= require components/jquery.cookie/jquery.cookie
(function($, ace, window) {
	var localStorage = window.localStorage;
	$(function() {
		$editor = $('#editor');
		$form = $('.editor-form');
		var editor = ace.edit("editor");
		editor.getSession().setMode("ace/mode/sql");

		if (localStorage.getItem('content.editor')) {
			editor.setValue(localStorage.getItem('content.editor').decodeBase64());
		}

		editor.on('change', function(e){
			localStorage.setItem('content.editor', editor.getValue().encodeBase64());
		});

		$('.run-btn').on('click', function() {
			$form.find('input[name="q"]').val(editor.getValue().encodeBase64());
			$form.submit();
			return false;
		});
	});
}(jQuery, ace, window));
