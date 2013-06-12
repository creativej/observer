(function($, Observer, window) {
	'use strict';

	Observer.actions.removeWidgetFromDashboard = function(url, id) {
		var dfd = new $.Deferred();
		$.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: {
				id: id
			}
		})
		.success(function(resp) {
			dfd.resolve();
		})
		.fail(function(resp) {
			Observer.alert('Remove failed', resp.responseText, 'medium');
		})
		;

		return dfd.promise();
	};
}(jQuery, Observer, window));
