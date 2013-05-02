//= require components/gridster/dist/jquery.gridster
//= require modules/widget
//
(function($, Observer, window) {
	Observer.modules.dashboard = function($el, options) {
		options = options || {};

		options = $.extend({
			margin: $el.data('margin'),
			dimensions: $el.data('dimensions')
		}, options);

		$el.find('ul').gridster({
			widget_margins: options.margin,
			widget_base_dimensions: options.dimensions
		});
	};
}(jQuery, Observer, window));
