//
(function($, Observer, window) {
    var integer = Observer.helpers.integer;

    function isWithin($item, col, row) {
        return (integer($item.data('row')) <= row) &&
        (integer($item.data('col')) <= col);
    }

	Observer.modules.widgetSizeOptions = function($el) {
		var
            instance = window.eventable(),
            $options = $el.find('[data-option]')
            ;

        instance.rowCol = function($option) {
            return [integer($option.data('col')), integer($option.data('row'))];
        };

        instance.select = function(col, row) {
            $options
                .removeClass('selected')
                .each(function() {
                    var $item = $(this);
                    if (isWithin($item, col, row)) {
                        $item.addClass('selected');
                    }
                });
            return this;
        };

        instance.set = function(col, row) {
            $el.data('value', [col, row]);
            this
                .select(col, row)
                .trigger('change', col, row)
                ;
        };

        instance.reset = function() {
            var rowCol = $el.data('value');
            if (rowCol) {
                instance.select(rowCol[0], rowCol[1]);
            }
        };

        $el.find('[data-option]')
            .click(function() {
                var rowCol = instance.rowCol($(this));
                instance.set(rowCol[0], rowCol[1]);
            })
            .on('mouseover', function() {
                var rowCol = instance.rowCol($(this));
                instance.select(rowCol[0], rowCol[1]);
            });

        $el.on('mouseleave', instance.reset);

        instance.reset();

		return instance;
	};
}(jQuery, Observer, window));
