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
//= require the_observer
//= require jquery_ujs
//= require components/sugar/release/sugar.min
//= require queries
//= require widgets
//= require website

// $(document).foundation();
(function(window, TheObserver, $) {
	"use strict";

	$(function() {
		TheObserver.trigger('ready.body');
		TheObserver.triggerPageReady();
	});

	window.onload = function() {
		TheObserver.trigger('onload.window');
		TheObserver.triggerPageLoaded();
	};
}(window, TheObserver, jQuery));
