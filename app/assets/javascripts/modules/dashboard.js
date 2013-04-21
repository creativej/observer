//= require components/gridster/dist/jquery.gridster
//
(function($, TheObserver, window) {
	TheObserver.modules.dashboard = function($el) {
	    $el.gridster({
	        widget_margins: [10, 10],
	        widget_base_dimensions: [100, 100]
	    });
	};
}(jQuery, TheObserver, window));
