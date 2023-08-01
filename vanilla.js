import item, { shoppingListLine } from "./oop.js";

$(document).ready(function () {
    var inventory = [];
    var shoppingList = [];

    // start add new item----------------------
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
            "<tr><td class='w3-center'>" + p.id + "</td><td class='w3-center'>" + p.name + "</td><td class='w3-center'>" + p.listPrice + "</td><td class='w3-center'>" + p.quantity + "</td><td class='w3-center'>" + p.value + "</td></tr>"
        );
        $("#add-new-item-pop-up").fadeToggle();
        alert('successfullly created')
    });
    // end add new item------------------


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
            inventory.forEach(function () {
                if (inventory[i]['name'] == nam) {
                    inventory[i].quantity += adjustment;
                }
                $("#inventory-list").append(
                    "<tr><td class='w3-center'>" + inventory[i]['id'] + "</td><td>" + inventory[i]['name'] + "</td><td class='w3-center'>" + inventory[i]['listPrice'] + "</td><td clss='w3-center'>" + inventory[i]['quantity'] + "</td><td class= 'w3-centre'>" + inventory[i]['value'] + "</td></tr>"
                );

                i++;
            })

            h++;
        })



    })

});