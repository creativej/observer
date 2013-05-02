// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/dashboard
(function($, window, Observer) {
	'use strict';

	Observer.onPageReady('dashboard.website', function() {
		Observer.modules.dashboard($('.dashboard.gridster'));
	});
}(jQuery, window, Observer));
