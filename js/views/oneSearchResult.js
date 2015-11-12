var app = app || {};

app.OneSearchResult = Backbone.View.extend({
  
    //el: $('#results'),


    tagName: 'div',

    template: _.template( $('#search_Template').html() ),
    events: {
       'click .toggle': 'togglecompleted'
       // 'dblclick #table-item': 'onClick'
      // 'dblclick div': 'onClick'
    },


    initialize: function() {
      this.render();
    },
    render: function() {
      console.log("rendering");
      $('#results').append( this.template( this.model.attributes ) );
     // main.append(this.$().html( this.template() ));
      return this;
    },
    
    onClick: function(e) {
      console.log(this.$el.html());
      
      console.log("clicked");
      /*e.preventDefault();
      var id = $(e.currentTarget).data("id");
      console.log(id);*/
      //var item = this.collection.get(id);
     // var name = item.get("name");
      //alert(name);
    },

    togglecompleted: function() {
      this.model.toggle();
     // console.log(this.model.get('completed') + ' ' + this.model.get('name'));
    }
    
  });

