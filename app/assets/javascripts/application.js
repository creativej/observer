// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require components/jquery/jquery
//= require jqplot/jquery.jqplot.js
//= require jqplot/plugins/jqplot.dateAxisRenderer
//= require the_observer
//= require modules/jqplot
//= require foundation
//= require modules/alert_modal
//= require jquery_ujs
//= require components/sugar/release/sugar.min
//= require queries
//= require widgets
//= require website

(function(window, Observer, $, document) {
	"use strict";

	$(function() {
		Observer.trigger('ready.body');
		Observer.triggerPageReady();

		$(document).foundation();
	});

	window.onload = function() {
		Observer.trigger('onload.window');
		Observer.triggerPageLoaded();
	};
}(window, Observer, jQuery, document));
