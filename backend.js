var inventory=[];
var id=inventory.length+1
       
function addInventory(name,price){
    
    var product={id:id,item:name, price:price};
    inventory.push(product);
    

    $("#item").append( 
        "<option>"+product.item+"</option>"     
    );
    
        
}

function refreshInventoryTable(){ 
    i=0;
    $.each(inventory,function(){        
        $("#inventory-list").append( 
            "<tr><td>"+inventory[i].id+"</td><td>"+inventory[i].item+"</td><td>"+inventory[i].price+"</td><td>"+0+"</td><td>"+0+"</td></tr>"     
        );
        i++;
        $("td").addClass("w3-center");
        $("td:first-of-type").addClass("w3-left")
    })

}

function loadItemDropDown(){
    alert("im fine");
    i=0;

    $.each($("#inventory-list>tr"),function(){        
        
        i++;
 
    })

}

