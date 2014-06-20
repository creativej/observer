(function($, Observer, window) {
	'use strict';

	Observer.modules.alertModal= function($el, title, msg, size) {
		var
			instance = {}
			;

		size = size || 'small';

		/**
		 * A hack to fix a bug in zurb reveal
		 * Source: http://foundation.zurb.com/forum/posts/375-foundation-5-reveal-options-not-working
		**/
		$el.data('reveal-init', {
			css: {
                open: {
                    'opacity': 0,
                    'visibility': 'visible',
                    'display': 'block'
                },
                close: {
                    'opacity': 1,
                    'visibility': 'hidden',
                    'display': 'none'
                }
			}
		});
		/** end back **/

		// $el.prop('class', 'reveal-modal ' + size);
		$el.find('h2:first').text(title);
		$el.find('.content').html(msg || '');
		$el.foundation('reveal', 'open');

		return instance;
	};

	Observer.alert = function(title, msg, size) {
		window.alert('Oh no! ' + title + '\nCheck the console for more details.');
		console.log(msg);
	};
}(jQuery, Observer, window));
