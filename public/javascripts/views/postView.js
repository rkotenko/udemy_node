var app = app || {};

app.PostView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#post-template').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        
        return this;
    }
});