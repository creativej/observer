(function($, Observer, window) {
    var modules = Observer.modules;
    Observer.modules.widgetEditor = function($el) {
        var
            instance = window.eventable(),
            $spinner = $el.find('.spinner-container'),
            $editor = $el.find('.editor[rel="ace-editor"]'),
            $saveBtn = $el.find('.save-btn'),
            spinner = modules.spinner($spinner),
            editor = modules.aceEditor($editor)
            ;

        instance.save = function() {
            Observer.trigger('reset.log');
            editor.lintJs();

            Observer.actions.saveAttribute(
                $saveBtn.data('url'),
                spinner,
                editor.serialize()
            ).done(function() {
                Observer.trigger('previewWidgetRequested');
            });
        };

        $el
            .on('webkitTransitionEnd, otransitionend, oTransitionEnd, msTransitionEnd, transitionend', function(e) {
                if (e.target === $el.get(0)) {
                    editor.resize();
                }
            })
            .click(function() {
                editor.focus();
            });

        editor
            .on('save.shortcut', instance.save)
            .on('preview.shortcut', function() {
                this.lintJs();
                Observer.trigger('previewWidgetRequested');
            })
            .on('focus', function() {
                Observer.trigger(this.mode() + 'ModeRequested');
            })
            .lintJs();

        $saveBtn.click(instance.save);

        return instance;
    };
}(jQuery, Observer, window));
