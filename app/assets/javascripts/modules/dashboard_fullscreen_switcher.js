(function($, Observer, window) {
    'use strict';

    Observer.modules.dashboardFullScreenSwitcher = function($el, options) {
        var
            instance = window.eventable(),
            $body = Observer.body()
            ;

        $el.click(function() {
            instance.toggleScreenMode();
            return false;
        });

        instance.isFullScreen = function() {
            return $body.hasClass('fullscreen');
        }

        instance.toggleScreenMode = function() {
            if (instance.isFullScreen()) {
                instance.normalScreen();
            } else {
                instance.fullScreen();
            }
        }

        instance.fullScreen = function() {
            $body.addClass('fullscreen');
            this.trigger('fullscreen');
        };

        instance.normalScreen = function() {
            $body.removeClass('fullscreen');
            this.trigger('normalscreen');
        }

        return instance;
    };
}(jQuery, Observer, window));
