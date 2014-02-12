//= require modules/widget_size_options
(function($, Observer, window, flight) {
	'use strict';

	var modules = Observer.modules;

	Observer.modules.WidgetPreferences = flight.component(function() {
		this.defaultAttrs({
			cached: {},
			saveBtnSelector: '[data-save]',
			cancelBtnSelector: '[data-cancel]',
			inputSelector: '[data-field]',
			sizeOptionsSelector: '[data-size-options]',
			rowSelector: '#widget_row',
			colSelector: '#widget_column',
			formSelector: 'form',
			spinnerSelector: '[data-spinner]'
		});

		this.cacheInputs = function() {
			var self = this;
			this.select('inputSelector').each(function() {
				var $input = $(this);
				self.attr.cached[$input.prop('name')] = $input.val();
			});
		};

		this.resetInputs = function() {
			var self = this;
			this.select('inputSelector').each(function() {
				var $this = $(this);
				$this.val(self.attr.cached[$this.prop('name')]);
			});

			this.attr.widgetOptions.set(
				this.select('colSelector').val(),
				this.select('rowSelector').val()
			);
		};

		this.show = function() {
			this.$node.foundation('reveal', 'open');
			this.cacheInputs();
		};

		this.close = function() {
			this.$node.foundation('reveal', 'close');
		};

		this.save = function() {
			Observer.actions.postForm(
				this.select('formSelector'),
				this.attr.spinner
			).done($.proxy(function() {
				this.close();
				this.trigger('saved');
			}, this));

			return false;
		};

		this.cancel = function(e) {
			e.preventDefault();

			this.close();
			this.trigger('cancel');
		};

		this.onWidgetOptionsChange = function(col, row) {
			this.cacheInputs();
			this.select('rowSelector').val(row);
			this.select('colSelector').val(col);
		};

		this.after('initialize', function () {
			var self = this;

			this.attr.spinner = modules.spinner(this.select('spinnerSelector'));
			this.attr.widgetOptions = modules.widgetSizeOptions(this.select('sizeOptionsSelector'));

			this.on('closed', this.resetInputs);

			this.on(this.select('formSelector'), 'submit', this.save);
			this.on('click', {
				cancelBtnSelector: this.cancel
			});
			this.on(document, 'showPreferenceRequested', this.show);

			this.attr.widgetOptions.on('change', $.proxy(this.onWidgetOptionsChange, this));
		});
	});
}(jQuery, Observer, window, flight));
