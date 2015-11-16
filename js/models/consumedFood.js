// js/models/todo.js

  var app = app || {};

  // Food Model
  // ----------
  // Our basic **Todo** model has `title` and `completed` attributes.

  app.ConsumedFood = Backbone.Model.extend({

    urlBase: '/js/models/consumedFood.js',

    
    // Default attributes ensure that each todo created has `title` and `completed` keys.
    defaults: {
      consumedQty: 1
    }
  });