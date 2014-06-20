//= require modules/spinner

(function($, Observer, flight, window) {
    'use strict';

    var modules = Observer.modules;

    Observer.modules.WidgetPreviewer = flight.component(function() {
        var formFields = [
            'js',
            'css',
            'html',
            'data',
            'column',
            'row'
        ];

        this.defaultAttrs({
           spinner: modules.spinner(Observer.$spinner()),
           sandboxSelector: '[data-sandbox]',
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

        this.onPreviewRequested = function(e, data) {
            this.update(data);
            this.preview();
        };

        this.preview = function() {
            var $form = this.select('previewWidgetFormSelector');

            this.prepareToPreview(this.proxy(function() {
                $form.submit();
                this.activate();
            }));

            this.resize(
                this.integer($form.find('[name="widget[row]"]').val()),
                this.integer($form.find('[name="widget[column]"]').val())
            );
        };

        this.update = function(data) {
            if (this.isUndefined(data)) {
                return;
            }

            var $form = this.select('previewWidgetFormSelector');

            formFields.forEach(this.proxy(function(field) {
                var inputName = 'widget[' + field + ']';

                if (this.isUndefined(data[field])) {
                    field = inputName;
                }

                if (this.isDefined(data[field])) {
                    $form.find('[name="' + inputName + '"]').val(data[field]);
                }
            }));
        };

        this.onUpdateRequested = function(e, data) {
            this.update(data);
        };

        this.idle = function() {
            this.$node.attr('data-idle', 'true');
        };

        this.activate = function() {
            this.$node.attr('data-idle', null);
        }

        this.after('initialize', function() {
            this.on(
                this.$sandbox(),
                'load',
                this.onSandboxLoaded
            );
            this.on('resizeRequested', this.resize);
            this.on('updateRequested', this.onUpdateRequested);
            this.on('idleRequested', this.idle);
            this.on(document, 'previewRequested', this.onPreviewRequested);

            if (this.$node.data('autoPlay')) {
                this.preview();
            }
        });
    }, Observer.mixins.withCore);

}(jQuery, Observer, flight, window));
