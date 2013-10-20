//= require modules/jqplot_themes
//= require jqplot/plugins/jqplot.canvasOverlay
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
			shadow: false,
			breakOnNull: true
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
			shadow: false,
			gridLineColor: '#ccc',
			borderColor: '#ccc'
		};

		instance.options = $.extend(true, defaultOptions, options);

		instance.useDateChart = function(options) {
			this.options = $.extend(true, this.options, dateChartOptions, options);
			return this;
		};

		instance.addVerticalLine = function(options) {
			verticalLines.push({
				verticalLine: $.extend(true, {
					lineWidth: 2,
					color: 'red',
					shadow: false,
					yOffset: 0,
					show: true
				}, options)
			});


			this.options.canvasOverlay = {
				show: true,
				objects: verticalLines
			};

			console.log(this.options);
			return this;
		};

		instance.useDateTimeChart = function(options) {
			dateChartOptions.axes.xaxis.tickOptions = {
				formatString: '%a %#I%p'
			};

			this.options = $.extend(
				true,
				this.options,
				dateChartOptions,
				options
			);

			return this;
		};

		instance.draw = function() {
			var plot = $.jqplot(id, dataSets, this.options);

			return plot;
		};

		return instance;
	};
}(jQuery, Observer));
