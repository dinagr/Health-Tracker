var app = app || {};

app.SearchView = Backbone.View.extend({
  
    el: $('#main'),

    tagName: 'div',

    collection: app.results,
  
    titleSearchTemplate: _.template( $('#searchTitle_Template').html() ), 

    buttonAddTemplate: _.template( $('#addButton_Template').html() ),

    template: _.template( $('#total_Template').html() ),

    templatePro: _.template( $('#totalPro_Template').html() ),

    events: {
      'click #search': 'search',
      'keypress #food': 'enterSearch',
      'click #add': 'add',
      'click #save': 'calcTotal'
    },
    
    initialize: function() {
      this.editMode = false;
      this.$input = this.$('#food');
    },
    calcTotal: function() {
      var totalCal = totalSugar = totalProtein = totalvitaminA = totalvitaminC = 0;

      _.each(app.consumed.models, function(elem){
        totalCal += elem.get('calories')*elem.get('consumedQty');
      $('#chosenFood').html( this.template({total: totalCal}));
      return this;
      });
    },
    enterSearch: function(event){
      if ( event.which !== 13 || !this.$input.val().trim()) {
        $('#results').html('');
        return;
      };
     this.search();
    },
    add: function(){
      $("input:checkbox:checked").each(function() {
        var checkedId = $(this).attr("name");
        this.itemUrl  = 'https://api.nutritionix.com/v1_1/item?id='+ checkedId +'&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143';
        $.ajax({
          url:  this.itemUrl
        })
        .done(function(data) {
          app.consumed.add(new app.ConsumedFood({id: data.item_id, name: data.item_name + ', ' +data.brand_name, qty: data.nf_serving_size_qty,calories: data.nf_calories, unit: data.nf_serving_size_unit, protein: data.nf_protein, sugars: data.nf_sugars, vitaminA: data.nf_vitamin_a_dv, vitaminC: data.nf_vitamin_c_dv}));
          var consumedFoodList = new app.ConsumedFoodList ({model : app.consumed.last()});  
        })
        .fail(function(err) {
          console.log("Could not load data from nutritionix!");
        });        
      });  
    
    },
    search: function( event ) {
      if (!this.$input.val().trim() ) {
        $('#results').html('');
        $('#add').html('');
        return;
      }
      else{
      if ($( "#title" ).length == 0)
        {
          $('#results').append(this.titleSearchTemplate());
        };
      this.url  = 'https://api.nutritionix.com/v1_1/search/' + this.$input.val().trim()  +
      '?results=0:10&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2C+nf_cholesterol%2Cnf_sugars%2C+nf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_serving_size_qty%2Cnf_serving_size_unit+++&appId=1e13bf43&appKey=d52266b3b4b27a814e112e4926874143';
      $.ajax({
          url:  this.url
      })
      .done(function(data) {
           _.each(data.hits, function(item){
              $('#results').append('<div class="rowt"><div class="cell name">' + item.fields.item_name + ', ' +item.fields.brand_name + '</div><div class="cell calories">' + item.fields.nf_calories + '</div><div class="cell"><input id="choose" type="checkbox" name='+ item.fields.item_id+'></div></div>');
              if ($( "#add" ).length == 0)
              {
                $('#footer').append('<button id = "add" >Add</button>');
              };
            },data.hits);
      })
      .fail(function(err) {
          console.log("Could not load data from nutritionix!");
      });
    };
    }
  });

var view = new app.SearchView();
view.render();
