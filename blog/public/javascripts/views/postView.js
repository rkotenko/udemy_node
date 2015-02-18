var app = app || {};

app.PostView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
    },
    events: {
        'click .delete': 'deletePost'
    },
    template: _.template($('#post-template').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        
        return this;
    },
    deletePost: function () {
        this.model.destroy();
    }
});