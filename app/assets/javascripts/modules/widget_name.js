(function($, Observer, window) {
	Observer.modules.widgetName = function($el) {
		var instance = {};
		var originalValue;

		$el.on('focus', function() {
			originalValue = $el.text();
		});

		Observer.Keyboard
			.keypress('enter', $el, function() {
				return false;
			})
			.keyup('enter', $el, function() {
				var data = {};

				data[$el.data('name')] = $el.text();

				$.ajax({
					url: $el.data('url'),
					data: data,
					type: 'PUT',
					dataType: 'json'
				}).fail(function(resp) {
					Observer.alert('Saving failed', resp.responseText, 'medium');
				});
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
