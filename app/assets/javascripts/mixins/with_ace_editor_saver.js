//= require modules/spinner
//= require actions/save_attribute

(function($, Observer, flight, window) {
    'use strict';

    var modules = Observer.modules;

    Observer.mixin('withAceEditorSaver', function() {
        this.defaultAttrs({
            spinner: modules.spinner(Observer.$spinner()),
            saveBtnSelector: '[data-save-btn]'
        });

        this.save = function() {
            var self = this;

            // Do nothing if no changes has been made
            if (!this.isDirty) {
                return;
            }

            if (!this.isValid) {
                console.log(this.lastLintError.name);
                console.log(this.lastLintError.message);

                window.alert('Oh we can\'t save this. Your ' + this.mode() + ' is invalid. :( \nPlease check the console for more info.');
                return;
            }

            this.lintJs();

            Observer.actions.saveAttribute(
                this.select('saveBtnSelector').data('url'),
                this.attr.spinner,
                this.serialize()
            ).done(this.proxy(function() {
                this.setDirty(false);

                Observer.trigger('saved', this.mode(), this.val());

                if (this.isAutoPreview()) {
                    this.trigger('previewWidgetRequested');
                }
            }));
        };

        this.after('initialize', function() {
            this.on('saveRequested', this.save);
            this.on('click', {
                saveBtnSelector: this.save
            });
        });
    });
}(jQuery, Observer, flight, window));
