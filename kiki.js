

$(document).ready(function(){ 

    $("#show-add-new-item-pop-up").click(function()
        {
            $("#add-new-item-pop-up").fadeToggle();
        });

    $("#close-add-new-item-pop-up").click(function()
        {
            $("#add-new-item-pop-up").fadeToggle();
        });

    $(".show-transact-pop-up").click(function(){
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