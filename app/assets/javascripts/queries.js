// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/query_form
//= require modules/editable_name

(function($, window, Observer) {
	'use strict';

	var
		modules = Observer.modules,
		actions = Observer.actions
		;

	Observer.onPageReady(['edit.queries'], function() {
		modules.QueryForm.attachTo('[data-query-form]');
		modules.EditableName.attachTo($('.query-name'));
	});
}(jQuery, window, Observer));
