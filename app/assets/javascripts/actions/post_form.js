(function($, Observer, window) {
	'use strict';

	Observer.actions.postForm = function($form, spinner, options) {
		var
			dfd = new $.Deferred()
			;

		function spinnerDo(action, text) {
			if (spinner) {
				spinner[action](text);
			}
		}

		options = $.extend({
			failedTitle: 'Saving failed'
		}, options);

		spinnerDo('show', options.action);

		$.ajax({
			url: $form.prop('action'),
			type: 'PUT',
			dataType: 'json',
			data: $form.serialize()
		})
		.success(function(resp) {
			spinnerDo('hide');
			dfd.resolve(resp);
		})
		.fail(function(resp) {
			Observer.alert(options.failedTitle, resp.responseText, 'medium');
			dfd.reject();
		})
		;

		return dfd.promise();
	};
}(jQuery, Observer, window));
