define(['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {
        return Backbone.View.extend({
            colors: ['blue', 'green', 'red'],

            itemTemplate: _.template(
                    "<a href='#item/<%= item.id %>'><%= item.color %></a>" +
                    "<button class='changeColor' style='float: right'>Change Color</button>"
            ),

            initialize: function() {
                var self = this;

                self.listenTo(self.model, 'change:color', self.removeOldCss);
            },

            events: {
                'click .changeColor': 'changeColor'
            },

            render: function() {
                var self = this;

                self.$el.addClass(self.getBorderClass(self.model.get('color')));

                self.$el.html(self.itemTemplate({item: self.model.toJSON()}));

                return self;
            },

            changeColor: function() {
                var self = this;

                var colorIndex = _.random(1);
                var newColor = _.without(self.colors, self.model.get('color'))[colorIndex];

                self.model.set('color', newColor);

                self.render();
            },

            getBorderClass: function(color) {
                var self = this;

                return color + '-border';
            },

            removeOldCss: function() {
                var self = this;

                console.log('I am responding to an event: ' + self.cid);

                var borderClass = self.getBorderClass(self.model.previous('color'));

                self.$el.removeClass(borderClass);
            }

        });
    }
);