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
		var instance = {};

		this.options = options || {};

		instance.useDateChart = function(options) {
			this.options = $.extend(true, dateChartOptions, options);
			return this;
		};

		instance.draw = function() {
			var plot = $.jqplot(id, dataSets, this.options);

			plot.themeEngine.newTheme('theme', Observer.jqplotTheme);
			plot.activateTheme('theme');

			return plot;
		};

		return instance;
	};
}(jQuery, Observer));
