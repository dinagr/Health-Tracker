var app = app || {};

app.Total = Backbone.View.extend({

    tagName: 'table',

    collection: app.consumed,
  
    template: _.template( $('#total_Template').html() ),

    //total: 0,

    /*events: {
      'click #search': 'search',
      'keypress #food': 'enterSearch',
      'click #add': 'add'
    },
    */ 
    
    initialize: function() {
      this.listenTo(this.collection, 'change', app.Total.calcTotal);
      this.calcTotal();
    },
    calcTotal: function() {
       var totalCal = totalFat = totalSugars = totalVitaminA = totalVitaminC = totalIron = 0;

      _.each(app.consumed.models, function(elem){
        totalCal += elem.get('calories')*elem.get('consumedQty');
        totalFat += elem.get('fat')*elem.get('consumedQty');
        totalSugars += elem.get('sugars')*elem.get('consumedQty');
        totalVitaminA += elem.get('vitaminA')*elem.get('consumedQty');
        totalVitaminC += elem.get('vitaminC')*elem.get('consumedQty');
        totalIron += elem.get('iron')*elem.get('consumedQty');
      });
      $('#chosenFoodTotal').html( this.template({totalCal: totalCal, totalSugars: totalSugars, totalVitaminA: totalVitaminA, totalVitaminC: totalVitaminC, totalIron: totalIron, totalFat: totalFat}));
       return this;
    }
  });

