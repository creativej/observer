//= require actions/save_attribute
//= require mixins/with_template_helpers
//= require mixins/with_meta_list_form
//= require canjs/can.jquery

(function($, Observer, window, yaml, undefined) {
    'use strict';

    var
        modules = Observer.modules,
        actions = Observer.actions,
        mixins = Observer.mixins
        ;

    Observer.module('WidgetBuilder', Observer.flightComponent(function() {
        this.defaultAttrs({
            contentSelector: '[data-content]',
            saveSelector: '[data-save]',
            fieldsSelector: '[data-for-save]',
            valueSelector: '[data-value]'
        });

        this.spinner = modules.spinner(Observer.$spinner());

        this.val = function(value) {
            if (value === undefined) {
                try {
                    return JSON.parse(this.select('valueSelector').val());
                } catch (e) {
                    return {};
                }
            }

            if (!this.isString(value)) {
                value = JSON.stringify(value);
            }

            this.select('valueSelector').val(value);
            this.trigger('valueChanged');
        };

        this.render = function(meta) {
            meta = meta || this.meta;

            var html = window.can.view('widget-builder-ejs', {
                meta: meta,
                helpers: this.templateHelpers,
                data: this.val()
            });

            this.meta = meta;

            this.select('contentSelector').html(html);

            this.trigger('activateTabRequested');
        };

        this.clean = function() {
            console.log('clean component');
        };

        this.onRenderRequest = function(e, metaYaml) {
            this.clean();
            this.renderYaml(metaYaml);
        };

        this.renderYaml = function(metaYaml) {
            var meta;

            try {
                meta = yaml.safeLoad(metaYaml);
            } catch(err) {
                console.log(err);
                return;
            }

            this.render(meta);
        };

        this.saveUrl = function() {
            return this.$node.data('save-url');
        };

        this.save = function() {
            var value = this.val() || {};

            this.select('fieldsSelector').each(function(field) {
                var $input = $(this);

                value[$input.prop('name')] = $input.val();
            });

            this.val(value);
        };

        this.saveUpstream = function() {
            actions.saveAttribute(
                this.saveUrl(),
                this.spinner,
                this.select('valueSelector').serialize()
            ).then(function(resp) {
                console.log(resp);
            });
        };

        this.after('initialize', function() {
            this.renderYaml(this.$node.data('meta'));

            this.on('itemAdded', function() {
                this.render();
            });

            this.on('itemDeleted', function() {
                this.render();
            });

            this.on('valueChanged', this.saveUpstream);
            this.on('renderRequested', this.onRenderRequest);
            this.on('change', {
                fieldsSelector: this.save
            });

        });
    }, mixins.withTemplateHelpers, mixins.withMetaListForm));
}(jQuery, Observer, window, jsyaml));
