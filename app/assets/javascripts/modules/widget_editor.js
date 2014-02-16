//= require mixins/with_ace_editor
//= require mixins/with_ace_editor_saver

(function($, Observer, flight, window) {
    'use strict';

    Observer.modules.WidgetEditor = Observer.flightComponent(
        'withAceEditor', 'withAceEditorSaver'
    );
}(jQuery, Observer, flight, window));
