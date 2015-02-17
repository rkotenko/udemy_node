var app = app || {};

app.PostModel = Backbone.Model.extend({
    idAttribute: '_id', //this is the unique id from mongo
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