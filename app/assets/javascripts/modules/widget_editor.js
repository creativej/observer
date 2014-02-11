//= require modules/spinner
//= require actions/save_attribute
//= require mixins/with_ace_editor

(function($, Observer, flight, window) {
    'use strict';

    var modules = Observer.modules;

    var WidgetEditor = function() {
        this.defaultAttrs({
            spinner: modules.spinner(Observer.$spinner()),
            saveBtnSelector: '[data-save-btn]'
        });

        this.save = function() {
            var self = this;

            this.lintJs();

            Observer.actions.saveAttribute(
                this.select('saveBtnSelector').data('url'),
                this.attr.spinner,
                this.serialize()
            ).done(function() {
                self.trigger('previewWidgetRequested');
            });
        };

        this.after('initialize', function() {
            this.on(
                'webkitTransitionEnd, otransitionend, oTransitionEnd, msTransitionEnd, transitionend',
                this.resize
            );

            this.on('click', this.focus);

            this.on('saveRequested', this.save);
            this.on('previewRequested', function() {
                this.lintJs();
                Observer.trigger('previewWidgetRequested');
            });
            this.on('focus', function() {
                Observer.trigger(this.mode() + 'ModeRequested');
            });

            this.on('click', {
                saveBtnSelector: this.save
            });
        });
    };

    Observer.modules.WidgetEditor = flight.component(Observer.mixins.withAceEditor, WidgetEditor);
}(jQuery, Observer, flight, window));
