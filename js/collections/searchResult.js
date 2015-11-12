var app = app || {};

/*
 * A Collection structure that contains query autocomplete results
 * from the Nutritionix Health API
 */
var SearchResult = Backbone.Collection.extend({

  model: app.FoodSearchReasult,

  query: '',

  appId: '1e13bf43',

  appkey: 'd52266b3b4b27a814e112e4926874143',

  //url: 'https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143',

  url: 'https://api.nutritionix.com/v1_1/search/taco?fields=item_name%2Citem_id%2Cbrand_name&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143',
//  parse: function(response) {
 //   return response.results;
//},
  sync: function(method, model, options) {
    var params = _.extend({
        type: 'GET',
        dataType: 'json',
        url: this.url,
       // processData: false
    }, options);
    return $.ajax(params);
}

});

//app.autoResults = new SearchResult();