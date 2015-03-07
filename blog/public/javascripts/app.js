var app = app || {};

$(document).on('ready', function () {
    app.appView = new app.AppView();

    // fetch all the posts.  route is /api, does a mongoose Find({})
    app.posts.fetch(); 
});