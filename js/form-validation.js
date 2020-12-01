jQuery(document).ready(function($){

	// hide messages 
	$("#error").hide();
	$("#sent-form-msg").hide();
	
	// on submit...
	$("#contactForm #submit").click(function() {
		$("#error").hide();
		
		//required:
		
		//name
		var name = $("input#name").val();
		if(name == ""){
			$("#error").fadeIn().text("Name required.");
			$("input#name").focus();
			return false;
		}
		
		// email
		var email = $("input#email").val();
		if(email == ""){
			$("#error").fadeIn().text("Email required");
			$("input#email").focus();
			return false;
		}
		
		// address
		var address = $("textarea#address").val();
		if(address == ""){
			$("#error").fadeIn().text("Address required");
			$("textarea#address").focus();
			return false;
		} 

		
		// send mail php
		var sendMailUrl = $("#sendMailUrl").val();
		
		//to, from & subject
		var to = $("#to").val();
		var from = $("#from").val();
		var subject = $("#subject").val();
		
		
				
		// consents
var type1 = "";
if ($('#type1').is(":checked"))
    type1 = $('#type1').val();

var type2 = "";
if ($('#type2').is(":checked"))
    type2 = $('#type2').val();
	
		
		// data string
    var dataString = 'name='+ name
        + '&email=' + email       
        + '&to=' + to
        + '&from=' + from
        + '&subject=' + subject   
+ '&address=' + encodeURIComponent(address)
+ '&projects[]=' + encodeURIComponent(type1)
+ '&projects[]=' + encodeURIComponent(type2);


		// ajax
		$.ajax({
			type:"POST",
			url: sendMailUrl,
			data: dataString,
			success: success()
		});
	});  
		
		
	// on success...
	 function success(){
	 	$("#sent-form-msg").fadeIn();
	 	$("#contactForm").fadeOut();
	 }
	
    return false;
});

