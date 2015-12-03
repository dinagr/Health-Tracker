var app = app || {};

app.ConsumedFoodList = Backbone.View.extend({

    el: $('#dailyFood'),

    tagName: 'div',

    events: {
        'click #edit': 'edit',
        'click #save': 'save'
    },

    template: _.template($('#foodList_Template').html()),
    titleChosenTemplate: _.template($('#choosenTitle_Template').html()),
    buttonEditTemplate: _.template($('#editButtons_Template').html()),
    buttonSaveTemplate: _.template($('#saveButtons_Template').html()),

    initialize: function() {
        this.render();
    },
    render: function() {
        //If there is no consumed food yet then add a teble
        if ($("#titleChosen").length == 0) {
            $('#foodList').append(this.titleChosenTemplate());
        };
        //If the edit button does not appear yet then add it
        if ($("#edit").length == 0) {
            this.$el.append(this.buttonEditTemplate());
        };
        //Add all the consumed food
        $('#foodList').append(this.template(this.model.attributes));
        return this;
    },
    edit: function() {
        //Change the consumed food table to edit view to edit the qty of each product
        var id = '#food' + this.model.get('id');
        $(id).replaceWith('<div class="cell quantity"><input type=text id ="food' + this.model.get('id') + '" value = ' + this.model.get('consumedQty') + '></div>');
        $('#saveButoon').html(this.buttonSaveTemplate());
    },
    save: function() {
        //Save the changes that the user performed during the edit view
        var resId = this.model.get('id');
        var dateFood = $('#datepicker')[0].value;
        var id = '#food' + resId;
        var res = app.consumed.where({
            id: resId,
            date: dateFood
        });
        if (res.length === 1) {
            var value = $(id)[0].value;
            if($.isNumeric(value)){
                res[0].save({
                    consumedQty: value
                });
            }
            else{
                alert('You can enter only numbers!')
            };
        };
        $(id).replaceWith('<div class="cell quantity" id ="food' + this.model.get('id') + '">' + this.model.get('consumedQty') + '</div>');
        $('#saveButoon').html('');
        view.calcTotal();
    }
});