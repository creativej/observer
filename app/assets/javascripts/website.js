// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/dashboard
(function($, window, TheObserver) {
	'use strict';

	TheObserver.on('ready.body', function() {
		TheObserver.modules.dashboard($('.dashboard.gridster ul'));
	});
}(jQuery, window, TheObserver));
