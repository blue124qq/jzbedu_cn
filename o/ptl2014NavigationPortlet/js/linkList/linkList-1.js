jQuery(function() {
	var $ = jQuery;
	
	$(document).ready(function() {
		$('#goButton').attr('href',$('#linkSelector :selected').val());
		$('#linkSelector').on("change", function(event) {
			$('#goButton').attr('href',$('#linkSelector :selected').val());
			if($('#linkSelector').val() != ""){
				$('#linkSelector-error').remove();
			}
		});
		
		$('#goButton').click(function(event) {
			if($('#linkSelector').val() == ""){
				if($("#linkSelector").siblings('span.error').length==0){
			   		$('<span class="error themeErrorMsg" id="linkSelector-error">'+ "Please select an option form the dropdown" +'</span>').insertAfter($("#linkSelector"));
			   		return false;
			   	}	
			}
		});
		
	});
});