//= require modules/spinner

(function($, Observer, flight, window) {
    'use strict';

    var modules = Observer.modules;

    Observer.modules.WidgetPreviewer = flight.component(function() {
        this.defaultAttrs({
           spinner: modules.spinner(Observer.$spinner()),
           sandboxSelector: '[data-sandbox]',
           $widgetForm: null,
           previewWidgetFormSelector: '[data-widget-preview-form]'
        });

        this.dimensions = function() {
            return this.$sandbox().data('dimensions');
        };

        this.$sandbox = function() {
            if (!this.attr.$sandbox) {
                this.attr.$sandbox = this.select('sandboxSelector');
            }

            return this.attr.$sandbox;
        };

        this.resize = function(row, column) {
            this.$sandbox()
                .css('width', column * this.dimensions()[0])
                .css('height', row * this.dimensions()[1]);

            this.$node
                .width(this.$sandbox().width())
                .height(this.$sandbox().height());
        };

        this.prepareToPreview = function(callback) {
            var self = this;
            this.attr.spinner.show();
            this.$sandbox().show().animate({
                opacity: 0
            }, 'fast', callback);
        };

        this.onSandboxLoaded = function() {
            this.attr.spinner.hide();

            this.$sandbox().show().animate({
                opacity: 1
            }, 'fast');
        };

        this.$widgetFormFields = function() {
            return this.attr.$widgetForm.find('input[type="hidden"]');
        };

        this.preview = function() {
            var $form = this.select('previewWidgetFormSelector');

            this.resize(
                parseInt($('#widget_row').val(), 10),
                parseInt($('#widget_column').val(), 10)
            );

            $form.html(
                this.$widgetFormFields()
                    .clone()
                    .prop('id', undefined)
                    .hide()
            );

            this.prepareToPreview(function() {
                $form.submit();
            });
        };

        this.after('initialize', function() {
            this.on(
                this.$sandbox(),
                'load',
                this.onSandboxLoaded
            );
            this.on('resizeRequested', this.resize);
            this.on(document, 'previewWidgetRequested', this.preview);
            this.preview();
        });
    });

}(jQuery, Observer, flight, window));
