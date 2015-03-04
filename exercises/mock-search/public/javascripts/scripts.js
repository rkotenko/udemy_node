var search = $('#search');
var submit = $('#submit'); 

search.keyup(checkForEnterKey);
submit.click(submitSearch);

function checkForEnterKey(e) {
    if(e.keyCode === 13){
        submitSearch();
    }
}

function submitSearch() {
    if(search.val())
        $.post('search', {'key': search.val()}, function(results) {
            var source = $("#results-template").html();
            var template = Handlebars.compile(source);
            var html = template(results);
            $('#results').html(html);        
        });
        
}