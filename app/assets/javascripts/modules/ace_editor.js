//= require components/ace-builds/src/ace
//= require components/ace-builds/src/theme-twilight
//= require components/ace-builds/src/mode-sql
//= require components/ace-builds/src/mode-javascript
//= require components/ace-builds/src/mode-scss
//= require components/ace-builds/src/mode-html
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

		if (!$el.length)
			return;

		editor = ace.edit($el.prop('id'));
		mode = modeReference[$el.data('mode')];

		$field = $($el.data('bind'));
		editor.setTheme('ace/theme/twilight');
		editor.getSession().setMode('ace/mode/'+mode);
		editor.renderer.setShowGutter(false);

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

		if ($field.val().trim()) {
			instance.update();
			instance.updateLastSavedValue();
		}

		editor.clearSelection();

		editor.on('change', function(e){
			$field.val(editor.getValue());
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
