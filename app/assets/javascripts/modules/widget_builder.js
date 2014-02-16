//= require actions/save_attribute
//= require canjs/can.jquery

(function($, Observer, window, yaml) {
    'use strict';

    var modules = Observer.modules;

    Observer.module('WidgetBuilder', Observer.flightComponent(function() {
        this.defaultAttrs({
            contentSelector: '[data-content]'
        });

        this.render = function(meta) {
            var html = window.can.view('widget-builder-ejs', {
                meta: meta
            });

            this.select('contentSelector').html(html);

            this.trigger('activateTabRequested');
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

            this.render(meta);
        };

        this.after('initialize', function() {
            this.renderYaml(this.$node.data('meta'));

            this.on('renderRequested', this.onRenderRequest);
        });
    }));
}(jQuery, Observer, window, jsyaml));
