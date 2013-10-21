//= require bower_components/moment/moment
//
(function($, Observer, window) {
	var helpers = Observer.helpers;
	var dataSet = function(list, options) {
		var
			instance = {
				dataList: {},
				columns: [{
					field: 'value'
				}]
			},
			defaultOptions = {
				format: 'YYYY-MM-DD',
				outputFormat: 'YYYY-MM-DD',
				preprocessor: function(item, column) {
					item[column] = parseFloat(item[column], 10);
					return item;
				}
			},
			groupBy,
			groupByPeriod
			;

		options = $.extend(true, defaultOptions, options);

		instance.setColumns = function(columns) {
			if (Array.isArray(columns)) {
				this.columns = columns;
			}

			return this;
		};

		instance.add = function(column, dateKey, value) {
			this.dataList[column] = this.dataList[column] || {};

			if (this.dataList[column][dateKey] && helpers.isNumber(value)) {
				this.dataList[column][dateKey] = this.dataList[column][dateKey] + value;
			} else {
				this.dataList[column][dateKey] = value;
			}
			var dateTime = window.moment(dateKey * 1000);
			if (!this.oldest || dateTime.isBefore(this.oldest)) {
				this.oldest = dateTime;
			}

			if (!this.latest || dateTime.isAfter(this.latest)) {
				this.latest = dateTime;
			}

			return this;
		};

		instance.groupBy = function(period) {
			if (!period) {
				return this;
			}

			groupByPeriod = period;

			groupBy = function(column, data) {
				if (data.timestamp) {
					date = window.moment(data.timestamp * 1000);
				} else {
					date = window.moment(data.datetime, options.format);
				}

				var timestamp = date
					.startOf(period)
					.unix()
					;
				return [timestamp, data[column]];
			};

			return this;
		};

		instance.outputColumn = function(column) {
			var arr = [];

			for (var index in this.dataList[column]) {
				if (groupBy) {
					dateTime = window.moment(index * 1000)
						.valueOf();
				} else {
					dateTime = index;
				}

				arr.push([dateTime, this.dataList[column][index]]);
			}
			return arr;
		};

		instance.output = function() {
			this.set(list);

			return this.columns.map(function(column) {
				return instance.outputColumn(column.field);
			});
		};

		instance.clear = function() {
			this.dataList = {};
			return instance;
		};

		instance.set = function(list) {
			if (!list) {
				return instance;
			}

			instance.clear();

			list.forEach(function(item, index) {
				instance.columns.forEach(function(column) {
					var arr = [];

					if (options.preprocessor) {
						item = options.preprocessor(item, column.field);
					}

					if (groupBy) {
						arr = groupBy(column.field, item);
					}

					instance.add(column.field, arr[0], arr[1]);
				});
			});

			if (groupBy) {
				this.columns.forEach(function(column) {
					instance.populateEmptyGaps(column.field);
				});
			}

			return this;
		};

		instance.populateEmptyGaps = function(column) {
			var current = this.oldest;

			do {
				current.add(groupByPeriod, 1);

				var dateKey = current.unix();

				if (
					current.isBefore(this.latest) &&
					this.dataList[column][dateKey] === undefined
				) {
					this.dataList[column][dateKey] = 0;
				}
			} while (current.isBefore(this.latest));
		};

		return instance;
	};

	Observer.modules.dataSet = dataSet;
}(jQuery, Observer, window));
