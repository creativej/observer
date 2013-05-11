(function($, Observer, window) {
	'use strict';

	Observer.modules.runQueryButton = function($el, editor) {
		var instance = window.eventable();

		$el.click(function() {
			$.post($(this).data('url'), { value: editor.val() })
				.done(function(resp) {
					instance.trigger('success.post', resp);
				})
				.fail(function() {
					Observer.alert('query failed');
				})
				;
			return false;
		});

		return instance;
	};
}(jQuery, Observer, window));
