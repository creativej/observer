//= require bower_components/ace-builds/src/ace
//= require bower_components/ace-builds/src/theme-twilight
//= require bower_components/ace-builds/src/mode-sql
//= require bower_components/ace-builds/src/mode-javascript
//= require bower_components/ace-builds/src/mode-scss
//= require bower_components/ace-builds/src/mode-html
//
(function($, ace, window, Observer) {
    'use strict';

    Observer.mixins.withAceEditor = function() {
        this.defaultAttrs({
            editorSelector: '[data-ace-editor]'
        });

        this.mode = function() {
            return {
                js: 'javascript',
                css: 'scss',
                html: 'html',
                sql: 'sql'
            }[this.$editor.data('mode')];
        };

        this.update = function() {
            this.attr.editor.setValue(this.val());
        };

        this.val = function(value) {
            if (!this.attr.$field) {
                this.attr.$field = $(this.$editor.data('bind'));
            }

            if (value) {
                this.attr.$field.val(value);
                return this;
            }
            return this.attr.$field.val();
        };

        this.serialize = function() {
            return this.attr.$field.serialize();
        };

        this.hasUnsavedContent = function() {
            return this.attr.lastSavedValue !== this.val();
        };

        this.updateLastSavedValue = function() {
            this.attr.lastSavedValue = this.val();
            return this.val();
        };

        this.resize = function() {
            this.attr.editor.resize();
        };

        this.focus = function() {
            this.attr.editor.focus();
        };

        this.lintJs = function() {
            if (this.mode() === 'javascript') {
                try {
                    eval('throw 0;' + this.attr.editor.getSession().getValue());
                } catch (e) {
                    if (e !== 0) {
                        Observer.debugger.log(e);
                    }
                }
            }
            return this;
        };

        this.bindKeyCommandsToEditor = function(editor) {
            editor.commands.addCommand({
                name: 'save',
                bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
                exec: $.proxy(function(editor) {
                    this.trigger('saveRequested');
                }, this),
                readOnly: true // false if this command should not apply in readOnly mode
            });

            editor.commands.addCommand({
                name: 'preview',
                bindKey: {win: 'Ctrl-ENTER',  mac: 'Command-ENTER'},
                exec: $.proxy(function(editor) {
                    this.trigger('previewRequested');
                }, this),
                readOnly: true // false if this command should not apply in readOnly mode
            });
        };

        this.handleUnloadEvent = function(e) {
            var
                message = "You still have unsaved content. Are you sure you want to leave this page",
                e = e || window.event;

            if (editor.hasUnsavedContent()) {
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
            editor.getSession().setMode('ace/mode/'+this.mode());
            this.attr.editor = editor;
            return editor;
        }

        this.after('initialize', function() {
            this.$editor = this.select('editorSelector');

            var editor = this.aceEditor(this.$editor.prop('id'));

            if (this.val().trim()) {
                this.update();
                this.updateLastSavedValue();
            }

            window.onbeforeunload = this.handleUnloadEvent;

            editor.clearSelection();

            editor.on('change', $.proxy(function(e){
                this.val(editor.getValue());
            }, this));

            editor.on('focus', $.proxy(function() {
                this.trigger('focus');
            }, this));

            this.bindKeyCommandsToEditor(editor);
        });
    };
}(jQuery, ace, window, Observer));
