
  // js/collections/todos.js

  var app = app || {};

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var DailyFood = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.Food,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage('HealthTracker-backbone'),

    // Filter down the list of all todo items that are finished.
    totalCal = 0;
    totalCalories: function() {
      this.foreach(function(item) {
        this.totalCal = item.totalCaloriePerFood();
        });
      return this.totalCal;
    }

  });

  // Create our global collection of **Todos**.
  app.DailyFood = new DailyFood();