$(document).on('ready', function () {
    var count = 0;
    $('#ajax-button').on('click', function () {
        count++;

        // make ajax request
        var toSend = {
            message: 'Hello count: ' + count
        };

        $.post('/users', toSend, function (data) {
            console.log(data);
        });    
    });
   
});