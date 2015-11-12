var app = app || {};

/*
 * A Collection structure that contains query autocomplete results
 * from the Nutritionix Health API
 */
app.Results = Backbone.Collection.extend({

  model: app.Food, 

  //localStorage: new Backbone.LocalStorage('SearchResults'),

  urlBase: '/js/collections/results.js'

});

app.results = new app.Results();
//app.results.create({title: 'apple'});