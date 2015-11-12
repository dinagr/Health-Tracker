var app = app || {};

/*
 * A Collection structure that contains query autocomplete results
 * from the Nutritionix Health API
 */
app.Consumed = Backbone.Collection.extend({

  model: app.Food, 

  localStorage: new Backbone.LocalStorage('Consumed'),

  urlBase: '/js/collections/consumed.js',

  getCompleted: function(){
			return this.where({completed:true});
		}

});

app.consumed = new app.Consumed();
//app.results.create({title: 'apple'});