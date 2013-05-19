(function($, Observer, window) {
	'use strict';

	Observer.actions.postForm = function($form, spinner, options) {
		var
			dfd = new $.Deferred()
			;

		options = $.extend({
			failedTitle: 'Saving failed'
		}, options);

		spinner.show();

		$.ajax({
			url: $form.prop('action'),
			type: 'PUT',
			dataType: 'json',
			data: $form.serialize()
		})
		.success(function(resp) {
			spinner.hide();
			dfd.resolve();
		})
		.fail(function(resp) {
			Observer.alert(options.failedTitle, resp.responseText, 'medium');
			dfd.reject();
		})
		;

		return dfd.promise();
	};
}(jQuery, Observer, window));
