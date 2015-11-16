var app = app || {};

/*
 * A Collection structure that contains query autocomplete results
 * from the Nutritionix Health API
 */
app.Consumed = Backbone.Collection.extend({

  model: app.ConsumedFood, 

  localStorage: new Backbone.LocalStorage('Consumed'),

  urlBase: '/js/collections/consumed.js'
});

app.consumed = new app.Consumed();
//app.results.create({title: 'apple'});