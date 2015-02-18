var app = app || {};

$(document).on('ready', function () {
    app.appView = new app.AppView();

    // set up the collection using bootstrapPosts, set in script tag in index.jade, which
    // gets its value from routes/index.js
    app.posts.reset(bootstrapPosts); 
});