

var SearchView = Backbone.View.extend({
  
    el: $('#main'),


    tagName: 'div',
  
    //template: _.template( $('#search_Template').html() ),

    events: {
      'click #search': 'search',
      'keypress #food': 'enterSearch',
      'click table': 'chooseFood'
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

    enterSearch: function(event){
      if ( event.which !== 13 || !this.$input.val().trim()) {
        $('#results').html('');
        return;
      };
      if (!this.finish)
        return;
      this.search();
    },
    search: function( event ) {
      if (!this.$input.val().trim() ) {
        $('#results').html('');
        return;
      };
      this.finish = false;
      $('#results').html('');
//        var id = '1e13bf43';
//        var key = 'd52266b3b4b27a814e112e4926874143';
      this.url  = 'https://api.nutritionix.com/v1_1/search/' + this.$input.val().trim()  +
      '?results=0:20&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2C+nf_cholesterol%2Cnf_sugars%2C+nf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_serving_size_qty%2Cnf_serving_size_unit+++&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143';
      $.ajax({
          url:  this.url
      })
      .done(function(data) {
            _.each(data.hits, function(item){
                $('#results').append('<tr><td>'+item.fields.item_name+' '+ item.fields.brand_name +'</td><td>'+item.fields.nf_calories+'</td></tr>');
            },data.hits);
      })
      .fail(function(err) {
          console.log("Could not load data from nutritionix!");
      });
      this.finish = true;
    },
    chooseFood: function(event){
      console.log("i am here");
      console.log(event);
    }
  
  });

var view = new SearchView();
view.render();
