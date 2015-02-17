var app = app || {};

app.PostModel = Backbone.Model.extend({
    defaults: {
        title: '',
        content: '',
        posted: ''
    }
});

app.PostCollection = Backbone.Collection.extend({
    url: '/api',
    model: app.PostModel
});

app.posts = new app.PostCollection();