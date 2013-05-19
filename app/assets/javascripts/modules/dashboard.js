//= require components/gridster/dist/jquery.gridster
//= require modules/widget
//
(function($, Observer, window) {
	'use strict';

	Observer.modules.dashboard = function($el, options) {
		var instance = window.eventable();

		options = options || {};

		options = $.extend({
			margin: $el.data('margin'),
			dimensions: $el.data('dimensions'),
			margins: [5, 5],
			maxSize: $el.data('max-size')
		}, options);

		var $ul = $el.find('ul');
		var gridster = $ul.gridster({
			widget_margins: options.margins,
			widget_base_dimensions: options.dimensions,
			max_size_x: options.maxSize[0],
			max_size_y: options.maxSize[1]
		}).data('gridster');

		instance.serialize = function() {
			var data = gridster.serialize();

			data.each(function(item, index) {
				item.id = $ul
					.find('li:eq(' + index + ')')
					.find('iframe')
					.data('widget-id')
					;
			});

			return data;
		};

		instance.addWidget = function(html, sizeX, sizeY) {
			var widget = gridster.add_widget(html, sizeX, sizeY);

			instance.trigger(
				'added.widget',
				instance.serialize(),
				widget
			);
		};

		return instance;
	};
}(jQuery, Observer, window));
