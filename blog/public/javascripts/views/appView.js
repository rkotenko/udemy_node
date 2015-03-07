var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#blog',
    events: {
        'submit #newpost': 'newPostSubmit'
    },
    initialize: function () {
        this.listenTo(app.posts, 'add', this.addOne);
        
        // a fetch is called in javascripts/app.js.  This fires an 'all' event
        // listen here and then add all the posts to the page
        this.listenTo(app.posts, 'all', this.addAll);
    },
    addAll: function () {
        this.$('#posts').empty();
        app.posts.each(this.addOne, this);    
    },
    addOne: function (post) {
        var view = new app.PostView({model: post});
        this.$('#posts').append(view.render().el);
    },
    newPostSubmit: function (e) {   
        e.preventDefault();
        var attributes = {
            title: this.$('[name="title"]').val(),
            content: this.$('[name="content"]').val(),
            posted: new Date()
        };
        
        app.posts.create(attributes);
        this.$('[type="text"]').val('');
    }
});