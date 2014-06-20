(function($, Observer, window) {
	'use strict';

	Observer.actions.postToUrl = function(url, options) {
		var
			dfd = new $.Deferred()
			;

		function spinner(action, text) {
			if (options.spinner) {
				options.spinner[action](text);
			}
		}

		options = $.extend({
			failedTitle: 'Post failed'
		}, options);

		spinner('show', options.action);

		$.ajax({
			url: url,
			type: 'POST',
			data: options.data
		})
		.success(function(resp) {
			spinner('hide');
			dfd.resolve(resp);
		})
		.fail(function(resp, status, error) {
			spinner('hide');
			Observer.alert(options.failedTitle, resp.responseText, 'medium');
			dfd.reject(resp.responseText);
		})
		;

		return dfd.promise();
	};
}(jQuery, Observer, window));
