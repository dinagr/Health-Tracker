 // var app = app || {};


  // The DOM element for a todo item...
  searchView = Backbone.View.extend({

 
    el: $('#search-food'),
    tagName: 'li',

    signForm: function(){$.ajax({
        type: "POST",
        url: "https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143",
        dataType: "JSON",
      })},

    // The DOM events specific to an item.
    events: {
     // 'keypress  #search': 'search',
      'click .searchButton': 'search'
    },
   
    // If you hit `enter`, we're through editing the item.
    search : function( e ) {

  // var id = '1e13bf43';
  // var key = 'd52266b3b4b27a814e112e4926874143';
   
  /*$.ajax({
      url: "https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143"
  }).done(
      function(res) {
         console.log(res);
      })
    .fail(
      function(err) {
         console.log("Could not load data from nutritionix!");
      });*/
//   });

 signForm.done(function(response){
  console.log("suc");
});

signForm.fail(function(response){
  console.log("err");
});

  
}

//search();
  });

  var blahView = new searchView() ; //({ el: $('#search-food') });