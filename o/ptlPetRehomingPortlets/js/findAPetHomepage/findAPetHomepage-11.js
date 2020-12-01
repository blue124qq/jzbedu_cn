	$(document).ready(function() {
	
		$("#theFindAPetPortlet #searchForm").submit(function(e){
			if (!validateForm()){
				e.preventDefault();
			}
		});
		
		$('#findAPetSelectAnimalType').change(function() {
			$("#animalTypeWrapper").removeClass("invalid");
			$("#findAPetSelectError").text("");
		});	
		
		$('#searchedLocation').on('input',function(e){
			$("#searchedLocationConflicts").text("");
		});
		
	});
	
	function validateForm() {

		valid = true;

		// check that there is an animal type selected
		if($("#findAPetSelectAnimalType").val() == "") {
			$("#findAPetSelectError").text("You must select a type");
			$('#findAPetSelectError').addClass('themeErrorMsg');
			valid = false;
		}
		
		// check that there is any location text entered
		if($("#searchedLocation").val() == "") {
			$("#searchedLocationConflicts").text("Please enter a location");
			$('#searchedLocationConflicts').addClass('themeErrorMsg');
			valid = false;
		}
		
		if (valid){
			$("#findAPetSelectError").text("");
			$("#findAPetSelectError").removeClass("themeErrorMsg");
			$("#searchedLocationConflicts").text("");
			$("#searchedLocationConflicts").removeClass("themeErrorMsg");
		} 
		

		return valid;
	}
	




