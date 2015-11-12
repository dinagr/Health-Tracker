var app = app || {};

app.SearchRes = Backbone.View.extend({
//el: '#search-results',
el: $('.searchbox'),
//collection: app.SearchResult,
feed: {},

events: {
      'click .searchButton': 'search'
      },


render: function() {
    console.log(this.feed);
    console.log('got here');
},
fetchData: function() {
    this.collection.fetch({
        success: function(collection, response) {
            for (i = 0; i < response.hits.length; i++)
            {
                console.log("s");
                //alert(response.hits[i].fields.item_name + ' ' + response.hits[i].fields.brand_name);
               // $('#search-results').append( '<li>' + response.hits[i].fields.item_name + '</li>');
               $('#results').append('<tr><td>'+data.hits[i].fields.item_name+'</td><td>'+ data.hits[i].fields.brand_name +'</td></tr>');

            }
            //console.log(response[i]);
             
            feed = response;
            // console.log(this.feed);

        },
        error: function() {
            console.log("failed to find instagram feed...");
        }
    });
},

search: function() {
    console.log('here');
    this.collection = new SearchResult();
    this.collection.on('sync', function(){
          this.render();
        }, this);
    console.log('got here');
    this.fetchData();
    
}
});

new app.SearchRes();