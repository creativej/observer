//= require actions/save_attribute
//= require mixins/with_template_helpers
//= require mixins/with_meta_list_form

(function($, Observer, window, yaml, ko, undefined) {
    'use strict';

    var
        modules = Observer.modules,
        actions = Observer.actions,
        mixins = Observer.mixins
        ;

    Observer.module('WidgetBuilder', Observer.flightComponent(function() {
        this.defaultAttrs({
            contentSelector: '[data-content]',
            fieldsSelector: '[data-auto-save="true"]',
            valueSelector: '[data-value]',
            previewBtnSelector: '[data-preview-btn]',
            addBtnSelector: '[data-add-btn]'
        });

        this.spinner = modules.spinner(Observer.$spinner());

        this.previewData = {};

        this.val = function(value) {
            if (this.isUndefined(value)) {
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

            this.meta = meta;
            this.updateMeta();
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

            this.trigger('saved', {
                value: value
            });
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

        this.updateMeta = function() {
            this.observableMeta.removeAll();

            this.observableMeta(this.metaArray());
            this.trigger('activateTabRequested');
        };

        this.metaArray = function(schema, data, shallow) {
            var self = this;
            var meta = schema || this.meta || {};
            var value;

            if (this.isUndefined(data)) {
                value = this.val();
            } else {
                value = data;
            }

            return $.map(meta, function(field, name) {
                var label;
                if (field.label) {
                    label = field.label;
                } else if (field.label !== false) {
                    label = name;
                }

                var isInput = ($.inArray(field.type, ['text', 'url', 'number']) >= 0);
                if (!isInput && field.type !== 'array') {
                    console.log('field type:', field.type, 'not supported');
                    return;
                }

                if (!field.name) {
                    field.name = name;
                }

                field.label = label;

                if (field.schema && !shallow) {
                    field.schema = self.metaArray(field.schema, value[name], true);
                }

                field.value = value[name];

                if (shallow) {
                    field.isArray = false;
                    field.value = '';
                } else {
                    field.isArray = (field.type === 'array');
                }
                field.autoSave = !shallow;
                field.forList = shallow;

                return field;
            })
        };

        this.applyKoBinding = function() {
            this.observableMeta = ko.observableArray(this.metaArray());

            ko.applyBindings(
                { meta: this.observableMeta },
                this.select('contentSelector').get(0)
            );
        };

        this.onPreviewBtnCLicked = function(e) {
            e.preventDefault();

            this.previewData['data'] = this.select('valueSelector').val();
            this.trigger('previewRequested', this.previewData);
        };

        this.onUpdatePreviewDataRequested = function(e, data) {
            data.data = this.val();
            this.previewData = data;
        };

        this.onAddBtnCLicked = function(e) {
            e.preventDefault();

            $.each(this.previewData, this.proxy(function(name, value) {
                this.$node.append(
                    $("<input>")
                        .attr("type", "hidden")
                        .attr("name", "widget[" + name + "]").val(value)
                );
            }));

            this.$node.submit();
        };

        this.after('initialize', function() {
            this.applyKoBinding();

            this.renderYaml(this.$node.data('meta'));

            this.on('itemAdded', this.updateMeta);

            this.on('itemDeleted', this.updateMeta);

            if (this.$node.data('auto-save')) {
                this.on('valueChanged', this.saveUpstream);
            }

            this.on('renderRequested', this.onRenderRequest);
            this.on('updatePreviewDataRequested', this.onUpdatePreviewDataRequested);
            this.on('change', {
                fieldsSelector: this.save
            });

            this.on('click', {
                previewBtnSelector: this.onPreviewBtnCLicked,
                addBtnSelector: this.onAddBtnCLicked
            });

            this.trigger('ready');
        });
    }, mixins.withMetaListForm));
}(jQuery, Observer, window, jsyaml, ko));
