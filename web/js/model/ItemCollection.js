define(['jquery', 'backbone', 'model/Item'],
    function($, Backbone, Item) {
        return Backbone.Collection.extend({

            url: '/rest/api/item',

            model: Item,

            initialize: function() {
                var self = this;


            }
        });
    }
);