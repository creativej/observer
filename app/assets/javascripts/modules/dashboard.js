//= require bower_components/gridster.js/dist/jquery.gridster
//= require modules/widget
//= require modules/dashboard_widget
//
(function($, Observer, window) {
	'use strict';

	var arrayRemove = Observer.helpers.arrayRemove;

	Observer.modules.dashboard = function($el, options) {
		var
			instance = window.eventable(),
			gridster,
			widgets = []
			;

		options = $.extend({
			margin: $el.data('margin'),
			dimensions: $el.data('dimensions'),
			margins: [5, 5],
			maxSize: $el.data('max-size'),
			disable: false
		}, options || {});

		var $ul = $el.find('ul');

		var draggable = {
			stop: function(event, ui) {
				instance.trigger('moved.widgets', gridster.serialize_changed());
			}
		};

		gridster = $ul.gridster({
			widget_margins: options.margins,
			widget_base_dimensions: options.dimensions,
			max_size_x: options.maxSize[0],
			max_size_y: options.maxSize[1],
			draggable: draggable,
			serialize_params: function($w, wgd) {
				return {
					col: wgd.col,
					row: wgd.row,
					size_x: wgd.size_x,
					size_y: wgd.size_y,
					id: $w.data('id')
				};
			}
		}).data('gridster');

		if (options.disable) {
			gridster.disable();
		}

		function dashboardWidget($widget) {
			var dw = Observer.modules.dashboardWidget($widget);
			widgets.push(dw);
			return dw
				.on('removed', function(widget) {
					gridster.remove_widget(widget);
					arrayRemove(widgets, dw);
				})
				.on('loaded', function() {
					widgets.forEach(function(widget) {
						if (!widget.isLoaded) {
							widget.load();
							return false;
						}
					});
				})
				;
		}

		$ul.children().each(function() {
			var $widget = $(this);
			dashboardWidget($widget);
		});

		if (widgets.length) {
			widgets[0].load();
		}

		instance.serialize = function(widget) {
			var data = gridster.serialize(widget);
			if (data.length > 1) {
				data.each(function(item, index) {
					item.id = $ul
						.find('li:eq(' + index + ')')
						.find('iframe')
						.data('widget-id')
						;
				});
			} else if (data.length) {
				data[0].id = $ul
					.find('li:last')
					.find('iframe')
					.data('widget-id')
					;
			}

			return data;
		};

		instance.addWidget = function(html, $item) {
			var widget = gridster.add_widget(html, $item.data('col'), $item.data('row'));
			var $widget = $(widget);

			$widget
				.attr('data-url', $item.data('url'))
				.attr('data-remove-url', $item.data('remove-url'))
				;

			dashboardWidget($widget).load();

			instance.trigger(
				'added.widget',
				this.serialize(widget),
				widget
			);
		};

		instance.disable = function() {
			gridster.disable();
			return this;
		};

		return instance;
	};
}(jQuery, Observer, window));
