(function($, Observer, window) {
	'use strict';

	Observer.modules.saveAction = function(url, spinner, value) {
		spinner.show();

		$.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			data: value
		})
		.success(function(resp) {
			spinner.hide();
		})
		.fail(function(resp) {
			Observer.alert('Saving failed', resp.responseText, 'medium');
		})
		;
	};
}(jQuery, Observer, window));
