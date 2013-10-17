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
//= require jqplot/jquery.jqplot.js
//= require jqplot/plugins/jqplot.dateAxisRenderer
//= require mixins/eventable
//= require observer
//= require modules/widget
//= require modules/jqplot
//= require modules/data_set
//= require bower_components/moment/moment
//= require widgets

(function(window, Observer, $, document) {
    "use strict";

    $(function() {
        Observer.trigger('ready.body');
        Observer.triggerPageReady();
    });

    $(window).load(function(){
        Observer.trigger('onload.window');
        Observer.triggerPageLoaded();
    });
}(window, Observer, jQuery, document));
