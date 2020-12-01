jQuery(function() {
	var $ = jQuery;
	$(document).ready(function(){

		doCaptcha();
		
		$("input").on("blur", function(){
			doCaptcha();
		});
		
		$(".button-holder").on("hover", function(){
			doCaptcha();
		});
			
		
	});
	
	function doCaptcha(){
		if( $("#siteKey").length>0 ){
			var siteKey = $("#siteKey").val();
			if( siteKey.length > 0 ){
				try{
					grecaptcha.ready(function() {
			            // do request for recaptcha token
			            // response is promise with passed token
						console.log("Contacting recaptcha");
						try{
				            grecaptcha.execute(siteKey, {action: 'singlepurposeform'}).then(function(token) {
				                console.log(token);
				                populateRecapture( token );
				            });;
						} catch (err){
							console.log(err)
						}
			        });
				} catch( error ){
					console.log("recaptcha call failed");
			    	console.error(error);
				}
			}
		}
	}
	
	function populateRecapture( token ){
		$('#recaptchaResponse').val( token );
	}

});	