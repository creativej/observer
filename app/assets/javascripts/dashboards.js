// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/editable_name
//
(function($, window, Observer, undefined) {
	'use strict';

	Observer.onPageReady(['edit.dashboards'], function() {
		Observer.modules.editableName($('.dashboard-name'));
		Observer.modules.dashboard($('.dashboard.gridster'));
	});

}(jQuery, window, Observer));
