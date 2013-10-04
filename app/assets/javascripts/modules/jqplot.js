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
			defaultOptions = {},
			verticalLines = []
			;

		defaultOptions.seriesDefaults = {
			renderOptions: {
				smooth: true
			},
			showMarker: false,
			shadow: false
		};

		defaultOptions.legend = {
			show: true,
			location: 'nw',
			border: 'none',
			background: 'transparent'
		};
		defaultOptions.grid = {
			backgroundColor: 'transparent',
			drawGridlines: true,
			drawBorder: false,
			shadow: false
		};

		options = $.extend(true, defaultOptions, options);

		instance.useDateChart = function(overrides) {
			options = $.extend(true, options, dateChartOptions, overrides);
			return this;
		};

		instance.addVerticalLine = function(overrides) {
			verticalLines.push({
				verticalLine: $.extend(true, {
					lineWidth: 4,
					color: 'rgb(255, 255, 255)',
					shadow: false,
					show: true,
					lineCap: 'butt'
				}, overrides)
			});

			console.log(verticalLines);

			options.canvasOverlay = {
				show: true,
				objects: verticalLines
			};

			return this;
		};

		instance.useDateTimeChart = function(overrides) {
			dateChartOptions.axes.xaxis.tickOptions = {
				formatString: '%a %#I%p'
			};

			options = $.extend(
				true,
				options,
				dateChartOptions,
				overrides
			);

			console.log(options);

			return this;
		};

		instance.draw = function() {
			var plot = $.jqplot(id, dataSets, options);

			return plot;
		};

		return instance;
	};
}(jQuery, Observer));
