var app = app || {};

app.ConsumedFoodList = Backbone.View.extend({
  
    el: $('#foodList'),


    tagName: 'div',

    events: {
       'click .toggle': 'togglecompleted'
       // 'dblclick #table-item': 'onClick'
       //'click tr': 'onClick'
    },
  
    template: _.template( $('#foodList_Template').html() ),


    initialize: function() {
      this.render();
    },
    render: function() {
      console.log("rendering");
      this.$el.append( this.template( this.model.attributes ) );
     app.total = new app.Total();
      return this;
    },
    
    onClick: function(e) {
      console.log("clicked");
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      console.log(id);
      //var item = this.collection.get(id);
     // var name = item.get("name");
      //alert(name);
    },

    togglecompleted: function() {
      this.model.toggle();
     // console.log(this.model.get('completed') + ' ' + this.model.get('name'));
    }
    
  });

