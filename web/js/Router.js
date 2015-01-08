define([
    'jquery', 'underscore', 'backbone',
    'view/ParentView', 'view/ItemView', 'view/ItemDetailsView', 'view/MemoryLeakParentView', 'model/ItemCollection', 'model/Item'
], function ($, _, Backbone, ParentView, ItemView, ItemDetailsView, MemoryLeakParentView, ItemCollection, Item) {
    return Backbone.Router.extend({

        routes: {
            'main': 'showMain',
            'item/:itemId': 'showItem'
        },

        initialize: function () {
            var self = this;

            var item1 = new Item({
                id: 1,
                color: 'blue',
                details: 'Some details about item 1'
            });
            var item2 = new Item({
                id: 2,
                color: 'green',
                details: 'Some details about item 2'
            });
            var item3 = new Item({
                id: 3,
                color: 'red',
                details: 'Some details about item 3'
            });

            self.itemCollection = new ItemCollection([item1, item2, item3]);
            self.parentView = new ParentView({el: '#content', model: self.itemCollection});


            //self.memoryLeakParentView = new MemoryLeakParentView({el: '#content', model: self.itemCollection});



            self.itemDetailsView = new ItemDetailsView({el: '#content'});

            Backbone.history.start();
        },

        showMain: function () {
            var self = this;

            self.parentView.render();
            //self.memoryLeakParentView.render();
        },

        showItem: function (id) {
            var self = this;

            var item = self.itemCollection.get(id);

            self.itemDetailsView.render(item);
        }
    });
});
