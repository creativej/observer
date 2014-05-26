//= require bower_components/ace-builds/src/ace
//= require bower_components/ace-builds/src/theme-twilight
//= require bower_components/ace-builds/src/mode-sql
//= require bower_components/ace-builds/src/mode-javascript
//= require bower_components/ace-builds/src/mode-scss
//= require bower_components/ace-builds/src/mode-html
//= require bower_components/ace-builds/src/mode-yaml
//= require bower_components/js-yaml/js-yaml.min
//
(function($, ace, window, Observer, yaml, undefined) {
    'use strict';

    Observer.mixin('withAceEditor', function() {
        this.defaultAttrs({
            editorSelector: '[data-ace-editor]'
        });

        this.isValid = true;
        this.lastLintError = {};
        this.isDirty = false;

        this.mode = function() {
            return {
                js: 'javascript',
                css: 'scss',
                html: 'html',
                sql: 'sql',
                yaml: 'yaml'
            }[this.$editor.data('mode')];
        };

        this.update = function() {
            this.editor.setValue(this.val());
        };

        this.setDirty = function(isDirty) {
            if (this.isDefined(isDirty)) {
                this.isDirty = isDirty;
                return;
            }

            this.isDirty = true;
        };

        this.val = function(value) {
            if (this.isDefined(value)) {
                this.$field.val(value);
                this.setDirty();
                return this;
            }

            return this.$field.val();
        };

        this.serialize = function() {
            return this.$field.serialize();
        };

        this.hasUnsavedContent = function() {
            return this.lastSavedValue !== this.val();
        };

        this.updateLastSavedValue = function() {
            this.lastSavedValue = this.val();
            return this.val();
        };

        this.resize = function() {
            this.editor.resize();
        };

        this.focus = function() {
            this.editor.focus();
        };

        this.bindKeyCommandsToEditor = function(editor) {
            editor.commands.addCommand({
                name: 'save',
                bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
                exec: this.proxy(function(editor) {
                    this.trigger('saveRequested');
                }),
                readOnly: true // false if this command should not apply in readOnly mode
            });

            editor.commands.addCommand({
                name: 'preview',
                bindKey: {win: 'Ctrl-ENTER',  mac: 'Command-ENTER'},
                exec: this.proxy(function(editor) {
                    this.trigger('previewWidgetRequested');
                }),
                readOnly: true // false if this command should not apply in readOnly mode
            });
        };

        this.handleUnloadEvent = function(e) {
            var message = "You still have unsaved content. Are you sure you want to leave this page";

            e = e || window.event;

            if (this.isDirty) {
                // For IE and Firefox
                if (e) {
                    e.returnValue = message;
                }
                // For Safari
                return message;
            }
        };

        this.aceEditor = function(id) {
            var editor = ace.edit(id);
            editor.setTheme('ace/theme/twilight');
            var session = editor.getSession();
            session.setMode('ace/mode/'+this.mode());
            session.setTabSize(2);

            this.editor = editor;
            return editor;
        };

        this.onChangeEvent = function(e) {
            var value = this.editor.getValue();

            this.val(value);

            if (this.isMode('yaml')) {
                this.lintYaml(value);
            }
        };

        this.isMode = function(mode) {
            return this.mode() === mode;
        };

        this.isAutoPreview = function() {
            return this.$node.data('auto-preview');
        };

        this.lintYaml = function(value) {
            try {
                yaml.safeLoad(value);
                this.isValid = true;
                this.trigger('valid');
            } catch(e) {
                this.isValid = false;
                this.trigger('invalid', e);
                this.lastLintError = e;
            }
        };

        this.lintJs = function() {
            if (this.isMode('javascript')) {
                try {
                    eval('throw 0;' + this.editor.getSession().getValue());
                } catch (e) {
                    if (e !== 0) {
                        Observer.debugger.log(e);
                    }
                }
            }
            return this;
        };

        this.onFocusRequest = function() {
            this.editor.focus();
            this.editor.resize(true);
        };

        this.payload = function() {
            var payload = {
                mode: this.mode(),
                fieldName: this.$field.prop('name'),
                value: this.val()
            };
            return payload;
        };

        this.after('initialize', function() {
            this.$editor = this.select('editorSelector');
            this.editor = this.aceEditor(this.$editor.prop('id'));
            this.$field = this.$node.siblings(this.$editor.data('bind'));

            if (this.val() && this.val().trim()) {
                this.update();
                this.updateLastSavedValue();
            }

            this.on('click', this.focus);
            this.editor.clearSelection();

            // window.onbeforeunload = this.proxy(this.handleUnloadEvent);

            this.bubbleEvent(this.editor, 'change', this.onChangeEvent);
            this.bubbleEvent(this.editor, 'focus');

            this.bindKeyCommandsToEditor(this.editor);
            this.on('focusRequested', this.onFocusRequest);
        });
    });
}(jQuery, ace, window, Observer, jsyaml));
