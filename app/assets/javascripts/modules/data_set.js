//= require components/moment/moment
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
					if (Object.has(item, 'datetime') || Object.has(item, 'value')) {
						return [item.datetime, item.value];
					} else {
						throw 'Data object format is invalid';
					}
				}
			},
			groupBy
			;
		options = $.extend(true, defaultOptions, options);

		instance.add = function(name, value) {
			if (data[name] && Object.isNumber(value)) {
				data[name] = data[name] + value;
			} else {
				data[name] = value;
			}
			return this;
		};

		instance.remove = function(name) {
			if (data[name]) {
				delete data[name];
			}

			return this;
		};

		instance.groupBy = function(period) {
			groupBy = function(date, value) {
				date = window.moment(date, options.format)
					.startOf(period)
					.format(options.outputFormat)
					;
				return [date, value];
			};

			return this;
		};

		instance.output = function() {
			this.set(list);

			var arr = [];
			for (var index in data) {
				arr.push([index, data[index]]);
			}
			return arr;
		};

		instance.clear = function() {
			data = {};
			return instance;
		};

		instance.set = function(list) {
			instance.clear();
			list.each(function(item, index) {
				var arr = options.filter.apply(item, [item, index]);

				if (groupBy) {
					arr = groupBy(arr[0], arr[1]);
				}

				instance.add(arr[0], arr[1]);
			});

			return instance;
		};

		return instance;
	};

	Observer.modules.dataSet = dataSet;
}(jQuery, Observer, window));
