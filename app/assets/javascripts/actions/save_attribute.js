(function($, Observer, window) {
	'use strict';

	Observer.actions.saveAttribute = function(url, spinner, value) {
		var dfd = new $.Deferred();

		spinner.show();

		$.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: value
		})
		.success(function(resp) {
			spinner.hide();
			dfd.resolve();
		})
		.fail(function(resp) {
			Observer.alert('Saving failed', resp.responseText, 'medium');
			dfd.reject();
		})
		;

		return dfd.promise();
	};
}(jQuery, Observer, window));
