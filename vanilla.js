import item, { shoppingListLine } from "./oop.js";
var inventory = [];
var grandTotal = 0;
var tsales = 0;
var tpurchases = 0;

function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    })

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
                beginAtZero: true,
            },

        },

        maintainAspectRatio: false,
        aspectRatio: 1,
        borderRadius:{topLeft:3,topRight:3},
      
    }
})
const salesChart = document.getElementById('mySalesChart');

var sc = new Chart(salesChart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [14, 15, 16, 20, 6, 13],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
               
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            legend: {
                display: false,
                
            }
        },
    },
})

const purchasesChart = document.getElementById('myPurchasesChart');

var pc = new Chart(purchasesChart, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [23, 5, 65, 45, 33, 50],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },

        plugins: {
            legend: {
                display: false,
                
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
        borderRadius:{topLeft:3,topRight:3},
        
    }
})

const profitChart = document.getElementById('myProfitChart');

var prc = new Chart(profitChart, {
    type: 'doughnut',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Profits',
            data: [23, 5, 65, 45, 33, 50],
            borderWidth: 1
        }]
    },
    options: {
        
        maintainAspectRatio: false,
        aspectRatio: 1
    }
})





$(document).ready(function () {

    var shoppingList = [];
    var tsales = 0;



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
        grandTotal = 0;
        $("#items-list").empty();
        $("#grand-total").text(0)

        $("#transact-pop-up-title").text(($(this).text()));
        $("#transact-pop-up").fadeToggle();
    });

    $("#close-transact-pop-up").click(function () {
        $("#transact-pop-up").fadeToggle();
    });



    $("#add-item-btn").click(function (event) {
        event.preventDefault();
        i = 0;
        inventory.forEach(function () {
            if (inventory[i].name == $("#item").val()) {
                var price = ($('#transact-pop-up-title').text() == 'Purchase') ? 0.8 * inventory[i].listPrice : inventory[i].listPrice
                const sp = new shoppingListLine($("#item").val(), Number($("#qty").val()), price);
                shoppingList.push(sp);

                console.log(shoppingList);
                $("#items-list").append(
                    "<tr><td>" + sp.name + "</td><td class='w3-center'>" + sp.listPrice + "</td><td class='w3-center'>" + sp.quantity + "</td><td class='w3-center'>" + sp.total + "</td></tr>"
                );
                grandTotal += sp.total;
                ($('#transact-pop-up-title').text() == 'Purchase') ? tpurchases += sp.total : tsales += sp.total;

                $("#grand-total").text(grandTotal);

                ($('#transact-pop-up-title').text() == 'Purchase') ? $("#tpurchases").text(tpurchases) : $("#tsales").text(tsales);

                $("#tprofit").text(0.2 * tsales);
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

                addData(c, inventory[i]['name'], inventory[i]['quantity'])
                i++;
            })
            h++;
        })

        alert('posted succesfully!')
        $("#transact-pop-up").fadeToggle()
    });




});

