jQuery(function(){
	var $ = jQuery;

	$(document).ready(function(){
		$('.findVacancyForm').submit(function(){
			var findVacancyLocationValidFlag=true;
			var value = $(this).find('#volunteerSearchedLocation').val();

			if(value == '' || value == 'Enter postcode or town/county' ){
				$(this).find('.locationConflicts').html("Please enter your location").addClass('findVacancyErrorMsg').show();
				$(this).find('#volunteerSearchedLocation').focus();
				findVacancyLocationValidFlag = false;
			}else{
				$(this).find('#volunteerSearchForm .locationConflicts').html("").hide();
			}
			var returnValue = findVacancyLocationValidFlag;
			return returnValue;
		});
	});
});
