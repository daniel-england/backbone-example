define(['jquery', 'underscore', 'backbone', 'view/ItemView'],
    function($, _, Backbone, ItemView) {
        return Backbone.View.extend({

            colorCountTemplate: _.template("<p>Blue: <%= blueCount %> Green: <%= greenCount %> Red: <%= redCount %>"),
            itemContainerTemplate: _.template("<div class='itemContainer' id='<%= item.id %>'></div>"),

            initialize: function() {
                var self = this;

                self.listenTo(self.model, 'change:color', self.updateCounts);
            },

            subviews: {},

            //self.model - itemCollection

            render: function() {
                var self = this;

                self.$el.empty();

                self.model.each(function(item) {

                    var itemContainer = $(self.itemContainerTemplate({item: item}));

                    self.$el.append(itemContainer);

                    var itemView = self.getSubView(item);
                    itemView.setElement(itemContainer);
                    itemView.render();
                });

                self.$el.append('<div id="itemCounts" class="itemContainer"/>');

                self.updateCounts();

                return self;
            },

            getSubView: function(item) {
                var self = this;

                if (self.subviews[item.id]) {
                    return self.subviews[item.id];
                } else {
                    var itemView = new ItemView({model: item});
                    self.subviews[item.id] = itemView;

                    return itemView;
                }
            },

            updateCounts: function() {
                var self = this;

                var blueCount = self.model.where({color: 'blue'}).length;
                var greenCount = self.model.where({color: 'green'}).length;
                var redCount = self.model.where({color: 'red'}).length;

                self.$('#itemCounts').html(self.colorCountTemplate({blueCount: blueCount, greenCount: greenCount, redCount: redCount}));
            }

        });
    }
);