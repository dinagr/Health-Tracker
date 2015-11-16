var app = app || {};

app.Total = Backbone.View.extend({
  
    el: $('#chosenFood'),


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
      var totalCal = 0;

      _.each(app.consumed.models, function(elem){
        totalCal += elem.get('calories')*elem.get('consumedQty');
      });
      this.$el.html( this.template({total: totalCal}) );
      return this;
    }
  });

