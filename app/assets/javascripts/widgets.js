// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require modules/spinner
//= require modules/sandbox
//= require modules/widget_preferences
//= require modules/widget_modifier
//= require modules/widget_resources
//= require modules/editable_name
//= require modules/widget_debugger
//= require modules/widget_editor
//= require modules/widget_previewer
//= require modules/widget_builder
//= require modules/tabs

(function($, window, Observer, undefined) {
    'use strict';

    var modules = Observer.modules;

    function bindEditorToPreviewer($editor, $previewer) {
        $editor.on('saved', function(evt, data) {
            var previewerPayload = {};
            previewerPayload[data.fieldName] = data.value;

            $previewer.trigger('updateRequested', previewerPayload);
        });
    }

    Observer.onPageReady(['edit.widgets'], function() {
        var $jsEditor = $('[data-js-editor]');
        var $yamlEditor = $('[data-yaml-editor]');
        var $cssEditor = $('[data-css-editor]');
        var $htmlEditor = $('[data-html-editor]');
        var $previewer = $('[data-widget-previewer]');
        var $builder = $('[data-widget-builder]');

        modules.WidgetEditor.attachTo($jsEditor);
        bindEditorToPreviewer($jsEditor, $previewer);

        modules.WidgetEditor.attachTo($yamlEditor);
        $yamlEditor.on('saved', function(evt, data) {
            $builder.trigger('renderRequested', data.value);
        });

        modules.WidgetEditor.attachTo($cssEditor);
        bindEditorToPreviewer($cssEditor, $previewer);

        modules.WidgetEditor.attachTo($htmlEditor);
        bindEditorToPreviewer($htmlEditor, $previewer);


        modules.WidgetPreviewer.attachTo($previewer);
        modules.Tabs.attachTo('[data-tabs]');

        modules.WidgetBuilder.attachTo($builder);

        modules.EditableName.attachTo('[data-editable-name]');
        modules.WidgetPreferences.attachTo('[data-widget-preferences]');

        modules.widgetModifier($('[data-widget-modifier]'));
        modules.widgetResources($('[data-widget-resources]'));

        var d = modules.widgetDebugger($('[data-widget-debugger]'));

        $('[data-widget-preferences]').on('saved', function(e, data) {
            $(document).trigger('previewRequested', data);
        });

        $('[data-id]').on('activate', function(e) {
            $(e.target).find('[data-ace-editor]').trigger('focusRequested');
        });

        Observer
            .on('log', d.log)
            .on('reset.log', d.reset)
            ;
    });

}(jQuery, window, Observer));
