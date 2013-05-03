//= require components/ace-builds/src/ace
//= require components/ace-builds/src/theme-twilight
//= require components/ace-builds/src/mode-sql
//= require components/ace-builds/src/mode-javascript
//= require components/ace-builds/src/mode-scss
//= require components/ace-builds/src/mode-html
//
(function($, ace, window, Observer) {
	'use strict';

	var localStorage = window.localStorage;

	Observer.modules.aceEditor = function($el) {
		var
			instance = {},
			mode,
			cacheKey,
			cachedValue,
			$field,
			editor
			;

		if (!$el.length)
			return;

		editor = ace.edit($el.prop('id'));
		mode = $el.data('mode');
		cacheKey = mode + '.editor';
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

		if ($field.val().trim()) {
			instance.update();
		} else if (!$field.val().trim() && localStorage.getItem(cacheKey)) {
			cachedValue = localStorage.getItem(cacheKey);
			editor.setValue(cachedValue);
			$field.val(cachedValue);
		}

		editor.on('change', function(e){
			localStorage.setItem(cacheKey, editor.getValue());
			$field.val(editor.getValue());
		});

		return instance;
	};
}(jQuery, ace, window, Observer));
