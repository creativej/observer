(function($, Observer, window, undefined) {
    'use strict';

    Observer.mixin('withMetaListForm', function() {
        this.defaultAttrs({
            listFormSelector: '[data-list-form]',
            listFormAddBtnSelector: '[data-add-item]',
            listFormItemsSelector: '[data-for-list]',
            listItemDeleteSelector: '[data-delete]'
        });

        this.onAddBtnClick = function(e) {
            var item = {};

            var $button = $(e.target);

            if ($button.hasClass('disabled')) {
                return;
            }

            var $form = this.getFormByChild($button);

            $form
                .find(this.attr.listFormItemsSelector)
                .each(function() {
                    var $item = $(this);
                    item[$item.prop('name')] = $item.val();
                });

            this.addItem($form.data('name'), item);
        };

        this.getFormByChild = function($item) {
            return $item.closest(this.attr.listFormSelector);
        };

        this.addItem = function(name, item) {
            var data = this.val();
            if (!this.isDefined(data[name]) || !this.isArray(data[name])) {
                data[name] = [];
            }

            data[name].push(item);
            this.val(data);
            this.trigger('itemAdded');
        };

        this.deleteItem = function(name, idx) {
            var data = this.val();
            console.log(data[name]);
            data[name].splice(idx, 1);

            this.val(data);
            this.trigger('itemDeleted');
        };

        this.onlistFormChange = function(e) {
            var $form = this.getFormByChild($(e.target));

            var needValue = false;
            $form
                .find(this.attr.listFormItemsSelector)
                .each(function() {
                    var $item = $(this);
                    if ($.trim($item.val()) === '') {
                        needValue = true;
                    }
                });

            if (needValue) {
                this.select('listFormAddBtnSelector').addClass('disabled');
            } else {
                this.select('listFormAddBtnSelector').removeClass('disabled');
            }
        };

        this.onDeleteBtnClick = function(e) {
            var $button = $(e.target);

            this.deleteItem($button.data('list-name'), $button.data('index'));
        };

        this.after('initialize', function() {
           this.on('click', {
                listFormAddBtnSelector: this.onAddBtnClick,
                listItemDeleteSelector: this.onDeleteBtnClick
            });

           this.on('change', {
                listFormItemsSelector: this.onlistFormChange
           });
        });
    });
}(jQuery, Observer, window));
