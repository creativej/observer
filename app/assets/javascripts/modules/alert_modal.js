(function($, Observer) {
	'use strict';

	Observer.modules.alertModal= function($el, title, msg, size) {
		var
			instance = {}
			;

		size = size || 'small';

		$el.prop('class', 'reveal-modal ' + size);
		$el.find('h2:first').text(title);
		$el.find('.content').html(msg || '');
		$el.foundation('reveal', 'open');

		return instance;
	};

	Observer.alert = function(title, msg, size) {
		return Observer.modules.alertModal($('#alert-modal'), title, msg, size);
	};
}(jQuery, Observer));
