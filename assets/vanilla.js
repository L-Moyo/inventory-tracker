import item, { shoppingListLine } from "./oop.js";
var inventory = [];

function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

function removeData(chart) {
     chart.data.labels=[];
    chart.data.datasets.forEach((dataset) => {
        dataset.data=[];})

    chart.update();
}


const ctx = document.getElementById('myChart');

var c = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Inventory Levels',
            data: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})
$(document).ready(function () {

    var shoppingList = [];

  
     

 





    // start add new inventory item----------------------------------------------------
    $("#show-add-new-item-pop-up").click(function () {
        $("#add-new-item-pop-up").fadeToggle();
    });

    $("#create-item-btn").click(function () {
        $("#add-to-inventory-list-form").submit(function (event) {
            event.preventDefault()
        });

        const p = new item(inventory.length + 1, $("#new-item-name").val(), $("#new-item-list-price").val());
        inventory.push(p);
     
        $("#item").append(
            "<option>" + p.name + "</option>"
        );

        $("#inventory-list").append(
            "<tr><td class='w3-center'>" + p.id + "</td><td>" + p.name + "</td><td class='w3-center'>" + p.listPrice + "</td><td class='w3-center'>" + p.quantity + "</td><td class='w3-center'><button class='w3-button w3-blue w3-round w3-tiny'>Edit</button></td></tr>"
        );

        $("#add-new-item-pop-up").fadeToggle();

        alert('successfullly created')
    });

    //end add new item----------------------------------------------------------------

    $("#close-add-new-item-pop-up").click(function () {

        $("#add-new-item-pop-up").fadeToggle();

    });

    $(".show-transact-pop-up").click(function () {

        $.getScript("backend.js", function () {
            loadItemDropDown();
        })


        shoppingList = [];
        $("#items-list").empty();

        $("#transact-pop-up-title").text(($(this).text()));
        $("#transact-pop-up").fadeToggle();
    });

    $("#close-transact-pop-up").click(function () {
        $("#transact-pop-up").fadeToggle();
    });

    var grandTotal = 0;

    $("#add-item-btn").click(function (event) {
        event.preventDefault();
        i = 0;
        inventory.forEach(function () {
            if (inventory[i].name == $("#item").val()) {
                const sp = new shoppingListLine($("#item").val(), Number($("#qty").val()), inventory[i].listPrice);
                shoppingList.push(sp);
               
                console.log(shoppingList);
                $("#items-list").append(
                    "<tr><td>" + sp.name + "</td><td class='w3-center'>" + sp.listPrice + "</td><td class='w3-center'>" + sp.quantity + "</td><td class='w3-center'>" + sp.total + "</td></tr>"
                );
                grandTotal = grandTotal + sp.total;
                $("#grand-total").text(grandTotal);
            }
            i++;
        })

    })


    $('#post-btn').click(function (event) {
        event.preventDefault();
        
        var h = 0;
        shoppingList.forEach(function () {
            var i = 0;
            var nam = shoppingList[h].name
            var adjustment = shoppingList[h].quantity

            $("#inventory-list").empty();
            removeData(c)
            inventory.forEach(function () {
                if (inventory[i]['name'] == nam) {

                    if ($('#transact-pop-up-title').text() == 'Purchase') {
                        inventory[i].quantity += adjustment;
                    }
                    else {
                        inventory[i].quantity -= adjustment
                    }
                }
                $("#inventory-list").append(
                    "<tr><td class='w3-center'>" + inventory[i]['id'] + "</td><td>" + inventory[i]['name'] + "</td><td class='w3-center'>" + inventory[i]['listPrice'] + "</td><td class='w3-center'>" + inventory[i]['quantity'] + "</td><td class= 'w3-centre'><button class='w3-button w3-blue w3-round w3-tiny'>Edit</button></td></tr>"
                );
               
                addData(c,inventory[i]['name'],inventory[i]['quantity'])
                i++;
            })
            h++;
        })

        alert('posted succesfully!')
        $("#transact-pop-up").fadeToggle()
    });




});

