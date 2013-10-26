//= require bower_components/ace-builds/src/ace
//= require bower_components/ace-builds/src/theme-twilight
//= require bower_components/ace-builds/src/mode-sql
//= require bower_components/ace-builds/src/mode-javascript
//= require bower_components/ace-builds/src/mode-scss
//= require bower_components/ace-builds/src/mode-html
//
(function($, ace, window, Observer) {
	'use strict';

	Observer.modules.aceEditor = function($el) {
		var
			modeReference = {
				js: 'javascript',
				css: 'scss',
				html: 'html',
				sql: 'sql'
			},
			instance = window.eventable({}),
			mode,
			lastSavedValue,
			$field,
			editor
			;

		if (!$el.length) {
			return;
		}

		editor = ace.edit($el.prop('id'));
		mode = modeReference[$el.data('mode')];

		$field = $($el.data('bind'));
		editor.setTheme('ace/theme/twilight');
		editor.getSession().setMode('ace/mode/'+mode);

		instance.update = function() {
			editor.setValue($field.val());
		};

		instance.val = function() {
			return $field.val();
		};

		instance.serialize = function() {
			return $field.serialize();
		};

		instance.hasUnsavedContent = function() {
			return lastSavedValue !== this.val();
		};

		instance.updateLastSavedValue = function() {
			return lastSavedValue = $field.val();
		};

		instance.mode = function() {
			return mode;
		};

		instance.resize = function() {
			editor.resize();
		};

		instance.focus = function() {
			editor.focus();
		};

		instance.lintJs = function() {
			if (mode === 'javascript') {
				try {
					eval('throw 0;' + editor.getSession().getValue());
				} catch (e) {
					if (e !== 0) {
						Observer.debugger.log(e);
					}
				}
			}
			return this;
		};

		if ($field.val().trim()) {
			instance.update();
			instance.updateLastSavedValue();
		}

		editor.clearSelection();

		editor.on('change', function(e){
			$field.val(editor.getValue());
		});

		editor.on('focus', function() {
			instance.trigger('focus');
		});

		editor.commands.addCommand({
			name: 'save',
			bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
			exec: function(editor) {
				instance.trigger('save.shortcut');
			},
			readOnly: true // false if this command should not apply in readOnly mode
		});

		editor.commands.addCommand({
			name: 'preview',
			bindKey: {win: 'Ctrl-ENTER',  mac: 'Command-ENTER'},
			exec: function(editor) {
				instance.trigger('preview.shortcut');
			},
			readOnly: true // false if this command should not apply in readOnly mode
		});

		return instance;
	};
}(jQuery, ace, window, Observer));
