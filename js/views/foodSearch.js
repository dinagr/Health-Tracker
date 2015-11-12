var app = app || {};

app.SearchView = Backbone.View.extend({
  
    el: $('#main'),


    tagName: 'div',

    collection: app.results,
  
    //template: _.template( $('#search_Template').html() ),

    events: {
      'click #search': 'search',
      'keypress #food': 'enterSearch',
      'click #add': 'add'
    },
    
    initialize: function() {
      this.$input = this.$('#food');
      this.finish = true;
    },
    render: function() {
      console.log("rendering");
      var main = $("#main");
     // main.append(this.$el.html( this.template() ));
      return this;
    },

    newAttributes: function(data) {
      return {
        title: data.fields.item_name
      };
    },

    enterSearch: function(event){
      if ( event.which !== 13 || !this.$input.val().trim()) {
        $('#results').html('');
        return;
      };
     this.search();
    },
    add: function(event){
     // console.log(app.results.get);
      
      var res = app.results.where({completed: false});
      console.log(res.length);
     // console.log(JSON.stringify(this.chosenResults.toJSON()));
      for(var i=0; i < res.length; i++){
        app.consumed.add(new app.ConsumedFood({id: res[i].get("id") , name: res[i].get("name"), brand: res[i].get("brand"), qty: res[i].get("qty"),calories: res[i].get("calories")}));
        var consumedFoodList = new app.ConsumedFoodList ({model : app.consumed.last()});
        console.log(res[i].get("id"));
        console.log(1);
      };
    
    },
    search: function( event ) {

      app.results.reset();
      if (!this.$input.val().trim() ) {
        $('#results').html('');
        return;
      };
//        var id = '1e13bf43';
//        var key = 'd52266b3b4b27a814e112e4926874143';
      this.url  = 'https://api.nutritionix.com/v1_1/search/' + this.$input.val().trim()  +
      '?results=0:20&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2C+nf_cholesterol%2Cnf_sugars%2C+nf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_serving_size_qty%2Cnf_serving_size_unit+++&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143';
      $.ajax({
          url:  this.url
      })
      .done(function(data) {
            _.each(data.hits, function(item){
               // $('#results').append('<tr><td>'+item.fields.item_name+' '+ item.fields.brand_name +'</td><td>'+item.fields.nf_calories+'</td></tr>');
              var food = new app.Food({item: 1});
           //   app.results.create({item: 1});
              app.results.add(new app.Food({id: item.fields.item_id, name: item.fields.item_name, brand: item.fields.brand_name, qty: item.fields.nf_serving_size_qty,calories: item.fields.nf_calories, completed: false}));
              var oneSearchResult = new app.OneSearchResult ({model : app.results.last()});
             
            },data.hits);

      })
      .fail(function(err) {
          console.log("Could not load data from nutritionix!");
      });
      console.log(app.results);
    }
  
  });

var view = new app.SearchView();
view.render();
