var app = app || {};

app.SearchView = Backbone.View.extend({

    el: $('#main'),

    collection: app.results,

    titleSearchTemplate: _.template($('#searchTitle_Template').html()),
    buttonAddTemplate: _.template($('#addButton_Template').html()),
    template: _.template($('#total_Template').html()),
    templatePro: _.template($('#totalPro_Template').html()),
    templateDetailedData: _.template($('#detailedData_Template').html()),

    events: {
        'click #search': 'search',
        'keypress #food': 'enterSearch',
        'click #addFood': 'add',
        'click #datepicker': 'chooseDate',
        'click .list-group-item': 'getData',
        'click #closeWindow': 'closeDetailedData',
        'click .remove': 'remove'
    },
    //Initialize data for the previous view wen ate app is opened
    initialize: function() {
        app.consumed.fetch();
        this.apiKey = 'fec4a995000374441d6d8d431f70f32f';
        this.apiId = '20804715';
        this.$input = this.$('#food');
        this.datePicker();
        //chooses the current date in the date picker
        this.dateFood = $('#datepicker')[0].value;
    },
    render: function() {
        //get all food consumed in the chossen date and show it
        consumedDate = app.consumed.where({
            date: this.dateFood
        });
        _.each(consumedDate, function(elem) {
            var consumedFoodList = new app.ConsumedFoodList({
                model: elem
            });
        });
        this.calcTotal();
    },
    remove: function(e) {
        //remove food from consumed food if user asked to remove
        id = $(e.currentTarget).attr('id');
        rowId = '#row' + id;
        var res = app.consumed.where({
            id: id
        });
        res[0].destroy();
        $(rowId).html('');
        this.calcTotal();
    },
    setNewDate: function(newDate) {
        //If the user choose a new date - show the cosumed food from the new date 
        this.dateFood = newDate;
        $('#foodList').html('');
        $('#results').html('');
        this.render();
    },
    calcTotal: function() {
        //calc the total consumption detalis daily
        var totalCal = totalFat = totalSugars = totalVitaminA = totalVitaminC = totalIron = 0;
        consumedDate = app.consumed.where({
            date: this.dateFood
        });
        _.each(consumedDate, function(elem) {
            totalCal += elem.get('calories') * elem.get('consumedQty');
            totalFat += elem.get('fat') * elem.get('consumedQty');
            totalSugars += elem.get('sugars') * elem.get('consumedQty');
            totalVitaminA += elem.get('vitaminA') * elem.get('consumedQty');
            totalVitaminC += elem.get('vitaminC') * elem.get('consumedQty');
            totalIron += elem.get('iron') * elem.get('consumedQty');
        });
        $('#chosenFoodTotal').html(this.template({
            totalCal: totalCal.toFixed(1),
            totalSugars: totalSugars.toFixed(1),
            totalVitaminA: totalVitaminA.toFixed(1),
            totalVitaminC: totalVitaminC.toFixed(1),
            totalIron: totalIron.toFixed(1),
            totalFat: totalFat.toFixed(1)
        }));

    },
    enterSearch: function(event) {
        //search triggered by 'enter' key
        if (event.which !== 13 || !this.$input.val().trim()) {
            $('#results').html('');
            this.closeDetailedData();
            return;
        };
        this.search();
    },
    search: function(event) {
        //seach triggered by the search button - serahc all item that match 
        if (!this.$input.val().trim()) {
            this.closeDetailedData();
            return;
        } else {
            this.url = 'https://api.nutritionix.com/v1_1/search/' + this.$input.val().trim() +
                '?results=0:20&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2C+nf_cholesterol%2Cnf_sugars%2C+nf_protein%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_dv%2Cnf_iron_dv%2Cnf_serving_size_qty%2Cnf_serving_size_unit+++&appId=' + this.apiId + '&appKey=' + this.apiKey;
            $.ajax({
                    url: this.url
                })
                .done(function(data) {
                    if (data.hits.length > 0) {
                        _.each(data.hits, function(item) {
                            $('#results').append('<button type="button" class="list-group-item" id="' + item.fields.item_id + '">' + item.fields.item_name + ', ' + item.fields.brand_name + '</button>');
                        }, data.hits);
                    } else {
                        $('#results').append('<h2>There are no search results!</h2>');
                    };
                })
                .fail(function(err) {
                    alert("Could not load data from nutritionix!");
                });
        };
    },
    add: function() {
        //add the chossen item to the consumed food list
        var table = $("#detailedData table");
        var checkedId = $(table).attr("id");
        this.dateFood = $('#datepicker')[0].value;
        var res = app.consumed.where({
            id: checkedId,
            date: this.dateFood
        });
        if (res.length > 0) {
            alert('This item is already in the list');
        } else {
            this.itemUrl = 'https://api.nutritionix.com/v1_1/item?id=' + checkedId + '&appId=' + this.apiId + '&appKey=' + this.apiKey;
            $.ajax({
                    url: this.itemUrl
                })
                .done(function(data) {
                    app.consumed.fetch();
                    var cFood = new app.ConsumedFood(({
                        date: $('#datepicker')[0].value,
                        id: data.item_id,
                        name: data.item_name + ', ' + data.brand_name,
                        qty: data.nf_serving_size_qty,
                        calories: data.nf_calories,
                        unit: data.nf_serving_size_unit,
                        fat: data.nf_total_fat,
                        sugars: data.nf_sugars,
                        vitaminA: data.nf_vitamin_a_dv,
                        vitaminC: data.nf_vitamin_c_dv,
                        iron: data.nf_iron_dv
                    }));
                    app.consumed.add(cFood);
                    cFood.save();
                    var consumedFoodList = new app.ConsumedFoodList({
                        model: app.consumed.last()
                    });
                    view.calcTotal();
                })
                .fail(function(err) {
                    alert("Could not load data from nutritionix!");
                });
        };
        this.closeDetailedData();
    },
    getData: function(e) {
        //show more detailes for the specific item in a popup window
        var chossenId = $(e.currentTarget).attr('id');
        var cal = unit = prot = sugar = a = c = fat = iron = '';
        this.itemUrl = 'https://api.nutritionix.com/v1_1/item?id=' + chossenId + '&appId=' + this.apiId + '&appKey=' + this.apiKey;
        $.ajax({
                url: this.itemUrl
            })
            .done(function(data) {
                cal = (data.nf_calories === null ? 0 : data.nf_calories);
                unit = (data.nf_serving_size_unit === null ? 0 : data.nf_serving_size_unit);
                qty = (data.nf_serving_size_qty === null ? 0 : data.nf_serving_size_qty);
                sugar = (data.nf_sugars === null ? 0 : data.nf_sugars);
                a = (data.nf_vitamin_a_dv === null ? 0 : data.nf_vitamin_a_dv);
                c = (data.nf_vitamin_c_dv === null ? 0 : data.nf_vitamin_c_dv);
                iron = (data.nf_iron_dv === null ? 0 : data.nf_iron_dv);
                fat = (data.nf_total_fat === null ? 0 : data.nf_total_fat);
                $('#detailedData').html('<table id ="' + data.item_id + '" ><tr><td class="smallHeader">Calories</td><td>' + cal + '</td></tr><tr><td class="smallHeader">Serving of </td><td>' + unit + '</td></tr><tr><td class="smallHeader">Serving quantity</td><td>' + qty + '</td></tr><tr><td class="smallHeader">Sugar</td><td>' + sugar + '</td></tr><tr><td class="smallHeader">Vitamin A</td><td>' + a + '</td> </tr><tr><td class="smallHeader">Vitamin C</td><td>' + c + '</td> </tr><tr><td class="smallHeader">Iron</td><td>' + iron + '</td></tr><tr><td class="smallHeader">Total Fat</td><td>' + fat + '</td></tr></td></tr></table><button id="addFood" class="btn-class">Add</button>&nbsp<button id="closeWindow" class="btn-class">Close</button>');
            })
            .fail(function(err) {
                console.log("Could not load data from nutritionix!");
            });
    },
    closeDetailedData: function() {
        //close popup window with detailed items 
        $('#detailedData').html('');
    },
    chooseDate: function(event) {
        $("#datepicker").datepicker({
            showButtonPanel: true
        });
    },
    datePicker: function() {
        $("#datepicker").datepicker({
            showOn: "button",
            dateFormat: "dd/mm/yy",
            buttonImage: "css/img/calendar.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            onSelect: function(dateText, inst) { 
                view.setNewDate(dateText);
            }
        });
        $('#datepicker').datepicker('setDate', 'today');
    }
});

var view = new app.SearchView();
view.render();