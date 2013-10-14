//= require bower_components/moment/moment
//
(function($, Observer, window) {
	var dataSet = function(list, options) {
		var
			instance = {},
			data = {},
			defaultOptions = {
				format: 'YYYY-MM-DD',
				outputFormat: 'YYYY-MM-DD',
				filter: function(item) {
					if (item.hasOwnProperty('datetime') || item.hasOwnProperty('value')) {
						return [item.datetime, item.value, item.timestamp];
					} else {
						throw 'Data object format is invalid';
					}
				}
			},
			oldest,
			latest,
			groupBy,
			groupByPeriod
			;
		options = $.extend(true, defaultOptions, options);

		instance.add = function(dateKey, value) {
			if (data[dateKey] && typeof value === 'number') {
				data[dateKey] = data[dateKey] + value;
			} else {
				data[dateKey] = value;
			}
			var dateTime = window.moment(dateKey * 1000);
			if (!oldest || dateTime.isBefore(oldest)) {
				oldest = dateTime;
			}

			if (!latest || dateTime.isAfter(latest)) {
				latest = dateTime;
			}

			return this;
		};

		instance.remove = function(dateKey) {
			if (data[dateKey]) {
				delete data[dateKey];
			}

			return this;
		};

		instance.groupBy = function(period) {
			groupByPeriod = period;

			groupBy = function(date, value, timestamp) {
				if (timestamp) {
					date = window.moment(timestamp * 1000);
				} else {
					date = window.moment(date, options.format);
				}

				timestamp = date
					.startOf(period)
					.unix()
					;
				return [timestamp, value];
			};

			return this;
		};

		instance.output = function() {
			this.set(list);
			var dateTime;
			var arr = [];

			for (var index in data) {
				if (groupBy) {
					dateTime = window.moment(index * 1000)
						.valueOf();
				} else {
					dateTime = index;
				}

				arr.push([dateTime, data[index]]);
			}

			return arr;
		};

		instance.clear = function() {
			data = {};
			return instance;
		};

		instance.set = function(list) {
			if (!list) {
				return instance;
			}

			instance.clear();

			list.forEach(function(item, index) {
				var arr = options.filter.apply(item, [item, index]);

				if (groupBy) {
					arr = groupBy(arr[0], arr[1], arr[2]);
				}

				instance.add(arr[0], arr[1]);
			});

			if (groupBy) {
				this.populateEmptyGaps();
			}

			return instance;
		};

		instance.populateEmptyGaps = function() {
			var current = oldest;

			do {
				current.add(groupByPeriod, 1);

				var dateKey = current.unix();

				if (typeof data[dateKey] === 'undefined') {
					data[dateKey] = 0;
				}
			} while (current.isBefore(latest));
		};

		return instance;
	};

	Observer.modules.dataSet = dataSet;
}(jQuery, Observer, window));
