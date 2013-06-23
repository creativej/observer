(function($, Observer, window) {
	function save($el, field) {
		var data = {};

		data[$el.data(field)] = $el.text();

		$.ajax({
			url: $el.data('url'),
			data: data,
			type: 'PUT',
			dataType: 'json'
		}).fail(function(resp) {
			Observer.alert('Saving failed', resp.responseText, 'medium');
		});
	}

	Observer.modules.editableName = function($el, spinner) {
		var instance = {};
		var originalValue;

		$el.on('focus', function() {
			originalValue = $el.text();
		});

		$el.on('blur', function() {
			if (originalValue !== $el.text()) {
				save($el, 'name');
			}
		});

		Observer.Keyboard
			.keypress('enter', $el, function() {
				return false;
			})
			.keyup('enter', $el, function() {
				$el.blur();

				return false;
			})
			.keyup('esc', $el, function() {
				$el.text(originalValue);
				$el.blur();
				return false;
			})
			;
	};
}(jQuery, Observer, window));
