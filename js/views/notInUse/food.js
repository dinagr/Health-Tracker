  var app = app || {};

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.searchView = Backbone.View.extend({

    //... is a list tag.
    el: '#search-results'
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template( $('#searchResults-template').html() ),

    // The DOM events specific to an item.
    events: {
      'keypress #search': 'search',
      'click #go': 'search'
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'search', this.render);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      return this;
    },

    // NEW - Toggles visibility of item
    
    // If you hit `enter`, we're through editing the item.
    search: function( e ) {
      if ( e.which === ENTER_KEY || !this.$input.val().trim() ) {
        break;
      }
    }
  });