var app = app || {};

app.Total = Backbone.View.extend({
  
    el: $('#foodList'),


    //tagName: 'div',

   // collection: app.results,
  
    template: _.template( $('#total_Template').html() ),

    total: 0,

    /*events: {
      'click #search': 'search',
      'keypress #food': 'enterSearch',
      'click #add': 'add'
    },
    */
    initialize: function() {
      

      _.each(app.consumed.models, function(elem){
        this.total += elem.get('calories');
      });
      this.render();
    },
    render: function() {
      this.$el.append( this.template({total: this.total}) );
      return this;
    }
  });

