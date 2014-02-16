//= require mixins/with_ace_editor
//= require mixins/with_ace_editor_saver

(function($, Observer, flight, window) {
    'use strict';

    Observer.module('WidgetMetaEditor', Observer.flightComponent(
        'withAceEditor',
        'withAceEditorSaver',
        function() {
            this.onSaved = function() {
                // this.
                // Observer.$document.trigger('renderWidgetBuilder', );
            };

            this.after('initialize', function() {
                this.on('saved', this.handleSaved);
            });
        }
    ));
}(jQuery, Observer, flight, window));
