// js/models/todo.js

  var app = app || {};

  // Food Model
  // ----------
  // Our basic **Todo** model has `title` and `completed` attributes.

  app.Food = Backbone.Model.extend({

    urlBase: '/js/models/food.js',

    
    // Default attributes ensure that each todo created has `title` and `completed` keys.
    defaults: {
      name: '',
      calories: 0,
      completed: false,
      qty: 0
    },
    toggle: function() {
      this.set({
        completed: !this.get('completed')
      });
    }
  });