(function($, Observer, window, undefined) {
    'use strict';

    Observer.mixin('withTemplateHelpers', function() {
        this.templateHelpers = {
            renderLabel: function(name, field) {
                if (field.label) {
                    return field.label;
                } else if (field.label !== false) {
                    return name;
                }

                return '';
            },
            renderTextField: function(name, field, data, forSave) {
                var dataForSave = '';

                if (forSave) {
                    dataForSave = 'data-for-save';
                } else {
                    dataForSave = 'data-for-list';
                }

                return '<label>' +
                    this.renderLabel(name, field) +
                    '<input name="' + name + '" type="text" placeholder="' + (field.placeholder || '') + '" value="' + (data || '') + '" ' + dataForSave + ' />' +
                    '</label>'
                    ;
            },
            renderUrlField: function(name, field, data) {
                return '<label>' +
                    this.renderLabel(name, field) +
                    '<input type="text" placeholder="' + (field.placeholder || '') + '" value="' + (data || '') + '" />' +
                    '</label>'
                    ;
            },
            renderField: function(name, field, data, deep) {
                var content = '';

                if (field.type === 'string') {
                    content = this.renderTextField(name, field, data, deep);
                } else if (field.type === 'url') {
                    content = this.renderTextField(name, field, data, deep);
                } else if (field.type === 'array') {
                    content = '<label class="widget-builder__array-label">' + this.renderLabel(name, field) + '</label>';
                    if (!deep) {
                        content += '<p>Your schema is too deep. </p>';
                    } else {
                        if (data) {
                            $.each(data, $.proxy(function(idx, item) {
                                var fieldContent = '';

                                for (var schemaIndex in field.schema) {
                                    var value = data[idx][schemaIndex];

                                    fieldContent +=
                                        '<div class="widget-builder__item"><span class="widget-builder__item-name">' + schemaIndex + ':</span> ' +
                                        ((value === undefined)? '' : value)
                                        + '</div>';
                                }

                                content += '<div class="row"> \
                                    <div class="small-12 columns"> \
                                        <div class="widget-builder__data-url">' + fieldContent + ' </div>\
                                        <i class="icon-cross widget-builder__delete-icon" data-delete data-index="' + idx + '" data-list-name="' + name + '"></i>\
                                    </div> \
                                </div>';
                            }, this));
                        }

                        content += '<div class="widget-builder__data-url" data-list-form data-name="' + name + '">';
                        for (var schemaIndex in field.schema) {
                            content += this.renderField(
                                schemaIndex,
                                field.schema[schemaIndex],
                                ''
                            );
                        }

                        content += '<div class="clearfix"><button class="button small secondary right disabled" type="button" data-add-item>Add</button></div>';
                        content += '</div>';
                    }

                }

                return ' \
                <div class="row"> \
                    <div class="large-12 columns">' + content + '</div> \
                </div>';
            }
        };
    });

}(jQuery, Observer, window));
