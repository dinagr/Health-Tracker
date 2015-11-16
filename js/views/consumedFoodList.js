var app = app || {};

app.ConsumedFoodList = Backbone.View.extend({
  
    el: $('#dailyFood'),

    tagName: 'div',

    events: {
      'click #edit': 'editView',
       'click #save': 'nonEditView'
    },
  
    template: _.template( $('#foodList_Template').html() ),

    titleChosenTemplate: _.template( $('#choosenTitle_Template').html() ),

    buttonEditTemplate: _.template( $('#editButtons_Template').html() ),

    buttonSaveTemplate: _.template( $('#saveButtons_Template').html() ),

    initialize: function() {
      this.editMode = false;
      this.render();
    },
    render: function() {
       if ($( "#titleChosen" ).length == 0)
      {
        $('#foodList').append(this.titleChosenTemplate());
      };
      if ($( "#edit" ).length == 0)
        {
          this.$el.append(this.buttonEditTemplate());
        };
      if ($( "#save" ).length == 0)
        {
          this.$el.append(this.buttonSaveTemplate());
        };
      $('#foodList').append( this.template( this.model.attributes ) );
      app.total = new app.Total();
      return this;
    },
    editView: function() {      
         var id = '#' + this.model.get('id');
          $(id).replaceWith( '<div class="cell" id="quantity"><input type=text id ='+ this.model.get('id') + ' value = '+ this.model.get('consumedQty') + '></div>' );
      },
    nonEditView: function() { 
      var resId = this.model.get('id');
      var id = '#' + resId;
      var res = app.consumed.where({id: resId});
      res[0].set({consumedQty: $(id)[0].value});
      $(id).replaceWith( '<div class="cell quantity" id =' + this.model.get('id')+ '>' + this.model.get('consumedQty') + '</div>');
    }
  });

