// js/models/todo.js

  var app = app || {};

  // Food Model
  // ----------
  // Our basic **Todo** model has `title` and `completed` attributes.

  app.ConsumedFood = Backbone.Model.extend({

    urlBase: '/js/models/consumedFood.js',

    
    // Default attributes ensure that each todo created has `title` and `completed` keys.
    defaults: {
      name: '',
      brand: '',
      calories: 0
     /* qty: 0,
      unit: '',
      itemId: '',
      calorie: 0,
      sugar: 0,
      protein: 0,
      cholesterol: 0*/
    }

    /* Update the quantity of food
    updateQuantity: function(quantity) {
      this.save({
        qty: quantity
      });
    },

    totalCaloriePerFood: function() {
      return qty*calorie;
    }*/

  });