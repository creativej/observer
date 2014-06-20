//= require modules/spinner
//= require mixins/with_ace_editor
//= require actions/post_to_url
//= require actions/post_form

(function($, window, Observer, flight) {
    'use strict';

    var
        modules = Observer.modules,
        actions = Observer.actions
        ;

    var QueryForm = function() {
        this.defaultAttrs({
            runBtnSelector: '[data-run-btn]',
            saveBtnSelector: '[data-save-btn]',
            resultContentSelector: '[data-result-content]',
            spinner: modules.spinner(Observer.$spinner())
        });

        this.runQuery = function() {
            var $resultContent = $(this.attr.resultContentSelector);

            actions.postToUrl(
                this.select('runBtnSelector').data('url'),
                {
                    spinner: this.attr.spinner,
                    data: {
                        value: this.val(),
                        connection_id: this.$node.find('#query_connection_id').val()
                    },
                    action: 'Executing query...'
                }
            )
            .then(function(resp) {
                $resultContent.hide().html(resp).fadeIn('fast');
            }, function(error) {
                console.log(error);
            });
        };

        this.saveQuery = function() {
            var self = this;
            actions
                .postForm(this.$node, this.attr.spinner, { action: 'Saving query...' })
                .done(function() {
                    self.updateLastSavedValue();
                });
        };

        this.handleRunBtn = function(e) {
            e.preventDefault();
            this.runQuery();
        };

        this.after('initialize', function() {
            this.on('click', {
                runBtnSelector: this.handleRunBtn,
                saveBtnSelector: this.saveQuery
            });

            this.on('saveRequested', this.saveQuery);
            this.on('previewRequested', this.runQuery);

            // this.runQuery();
        });
    };

    Observer.module('QueryForm', Observer.flightComponent(
        Observer.mixins.withAceEditor,
        QueryForm
    ));

}(jQuery, window, Observer, flight));
