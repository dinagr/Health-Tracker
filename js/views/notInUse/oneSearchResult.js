var app = app || {};

app.OneSearchResult = Backbone.View.extend({
  
    el: $('#results'),

    tagName: 'div',

    template: _.template( $('#search_Template').html() ),

    titleTemplate: _.template( $('#searchTitle_Template').html() ),

    Buttontemplate: _.template( $('#addButton_Template').html() ),

    initialize: function() {
      this.render();
    },

    render: function() {
      if ($( "#title" ).length == 0)
      {
        $('#results').append(this.titleTemplate());
      };
      console.log($( "#add" ).length);
      if ($( "#add" ).length == 0)
      {
        console.log("add");
        $('#button').html(this.Buttontemplate());
      };
      $('#results').append( this.template( this.model.attributes ) );
      if (!($( "#data" ).hasClass( "bcg"))){
        $('#data').addClass('bcg');
      };
      return this;
    },
    
    onClick: function(e) {
      console.log(this.$el.html());
      console.log("clicked");
    },

    togglecompleted: function() {
      this.model.toggle();
    }    
  });

