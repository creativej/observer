//= require modules/jqplot_themes
(function($, Observer) {
	var dateChartOptions = {
		axes:{
			yaxis:{ min: 0 },
			xaxis:{
			renderer: $.jqplot.DateAxisRenderer,
				tickOptions: {
					formatString: '%Y-%#m-%#d'
				}
			}
		}
	};

	Observer.jqplot = function(id, dataSets, options) {
		var
			instance = {},
			defaultOptions = {}
			;

		defaultOptions.seriesDefaults = {
			renderOptions: {
				smooth: true
			},
			showMarker: false
		};

		defaultOptions.legend = {
			show: true,
			location: 'nw',
			border: 'none',
			background: 'transparent'
		};
		defaultOptions.grid = {
			backgroundColor: 'transparent',
			drawGridlines: false,
			drawBorder: false,
			shadow: false
		};

		options = $.extend(true, defaultOptions, options);

		instance.useDateChart = function(overrides) {
			options = $.extend(true, options, dateChartOptions, overrides);
			return this;
		};

		instance.draw = function() {
			var plot = $.jqplot(id, dataSets, options);

			return plot;
		};

		return instance;
	};
}(jQuery, Observer));
