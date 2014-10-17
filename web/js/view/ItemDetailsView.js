define(['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {
        return Backbone.View.extend({

            itemTemplate: _.template(
                    "<p>ID: <%= item.id %></p>" +
                    "<p>Color: <%= item.color %></p>" +
                    "<p>Details: <%= item.details %></p>" +
                    "<p><a href='#main'>All Items</a></p>"
            ),

            initialize: function() {

            },

            render: function(item) {
                var self = this;

                self.model = item;

                self.$el.empty();

                self.$el.html(self.itemTemplate({item: self.model.toJSON()}));
            }
        });
    }
);