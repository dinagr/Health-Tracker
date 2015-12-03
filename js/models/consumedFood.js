
var app = app || {};

// ConsumedFood Model
// ----------
// ConsumedFood is a model for saving every consumed item and the date in which it was consumed

app.ConsumedFood = Backbone.Model.extend({

    urlBase: '/js/models/consumedFood.js',

    defaults: {
        consumedQty: 1
    }
});