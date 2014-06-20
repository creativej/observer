(function($, Observer, window, flight) {
    'use strict';

	Observer.modules.EditableName = flight.component(function() {
		this.defaultAttrs({
			field: 'name'
		});

		this.save = function(field) {
			var data = {};

			data[this.$node.data(field)] = this.$node.text();

			$.ajax({
				url: this.$node.data('url'),
				data: data,
				type: 'PUT',
				dataType: 'json'
			}).fail(function(resp) {
				Observer.alert('Saving failed', resp.responseText, 'medium');
			});
		};

		this.handleFocusEvent = function() {
			this.originalValue = this.$node.text();
		};

		this.handleBlurEvent = function() {
			if (this.originalValue !== this.$node.text()) {
				this.save(this.attr.field);
			}
		};

		this.after('initialize', function() {
			this.on('focus', this.handleFocusEvent);
			this.on('blur', this.handleBlurEvent);

			var $el = this.$node;

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
		});
	});
}(jQuery, Observer, window, flight));
