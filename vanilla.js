

$(document).ready(function(){ 


    /*const a='{"id":2,"item":"Chelsea","price":21.00,"avail":6,"v":106}';
    y=JSON.parse(a);
    $("#inventory-list").append(
        "<tr><td>"+y.id+"</td><td>"+y.item+"</td><td>"+y.price+"</td><td>"+y.avail+"</td><td>"+y.v+"</td></tr>"    
    );
    $("td").addClass("w3-center");
    $("td:first-of-type").addClass("w3-left")
        var o;

    $.getJSON( "backend.json", function( data ) {
        var i=0;
        $.each(data.products,function(){
            
            $("#inventory-list").append(

                "<tr><td>"+data.products[i].id+"</td><td>"+data.products[i].item+"</td><td>"+data.products[i].price+"</td><td>"+data.products[i].available+"</td><td>"+16+"</td></tr>"    
          
            );
            i++;
            $("td").addClass("w3-center");
            $("td:first-of-type").addClass("w3-left")
        })
      });*/
  

      

    $("#show-add-new-item-pop-up").click(function()
        {
            $("#add-new-item-pop-up").fadeToggle();
        });

        $("#create-item-btn").click(function()
        {           
            $("#add-to-inventory-list-form").submit(function(event){
                event.preventDefault()});

                

            $.getScript("backend.js",function(){
                
                addInventory($("#new-item-name").val(),$("#new-item-list-price").val());
                refreshInventoryTable();
                
              })

              
        });

    $("#close-add-new-item-pop-up").click(function()
        {
            $("#add-new-item-pop-up").fadeToggle();
        });

    $(".show-transact-pop-up").click(function(){

        /*$.getScript("backend.js",function(){      
           loadItemDropDown();
          })*/


     $("#transact-pop-up-title").text(($(this).text()));
     $("#transact-pop-up").fadeToggle();
    });

   $("#close-transact-pop-up").click(function()
   {
    $("#transact-pop-up").fadeToggle();
   });
   var grandTotal=0;
   $("#add-item-btn").click(function(){

    $("#transact-form").submit(function(event){
        event.preventDefault()});
    
       
    var item =$("#item").val()
    var price= 15;
    var qty=Number($("#qty").val());
    var total=price*qty;
    grandTotal=grandTotal+total;
    alert(grandTotal)

    $("#items-list").append(
        "<tr><td>"+item+"</td><td>"+price+"</td><td>"+qty+"</td><td>"+total+"</td></tr>"    
    );
    $("td").addClass("w3-center");
   $("td:first-of-type").addClass("w3-left");
   })
   $("#grand-total").text(grandTotal);

   

});