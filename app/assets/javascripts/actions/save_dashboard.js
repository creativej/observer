(function($, Observer, window) {
	'use strict';

	Observer.actions.saveDashboard = function(url, data) {
		var dfd = new $.Deferred();
		$.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: {
				widgets: JSON.stringify(data)
			}
		})
		.success(function(resp) {
			dfd.resolve();
		})
		.fail(function(resp) {
			Observer.alert('Saving failed', resp.responseText, 'medium');
		})
		;

		return dfd.promise();
	};
}(jQuery, Observer, window));
