var app = app || {};

var SearchView = Backbone.View.extend({
    el: $('#search-food'),

    tagName: 'li',
  
    template: _.template( $('#searchResults-template').html() ),

    events: {
      'click .searchButton': 'search'
      }
    ,
    initialize: function() {
      this.el = $('.container');
      this._ensureElement();
      console.log('here in search');
      console.log($('.searchButton'));
},
    render: function() {
      console.log("rendering new");
    //  this.view.on('initialize', this.print, this);
     // var main = $("#main");
    //  main.append(this.$el.html( this.template() ));
      return this;
    },
    print: function() {
      event.preventDefault();
        alert("whyyy");
      },
    search: function (e) {
     // this.query = query;
     console.log("search");
     new app.SearchRes();
    }
  
  });

var view = new SearchView();
view.render();

