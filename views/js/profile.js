$(document).ready(function(){

    $( "#form2" ).submit(function(event) {
        event.preventDefault();
        console.log("Form submitted");
    
        $.ajax({
            type: 'POST',
            url: '/profile',
            data: $('#form2').serialize(),
            dataType: "json",
            success: function(response){
                //alert("a");
                //console.log(response.Success);
                $('#form2')[0].reset();
    
                document.getElementById("check").innerHTML=response.Success;
                     //ADD THIS CODE
                     setTimeout(function(){
                         document.getElementById("check").innerHTML="";
                     },3000);
                     if (response.Success=="Success!") {
                         document.getElementById("aaa").click();
                     };
                 },
                 error: function() {
                 }
             })
    });
    
    });