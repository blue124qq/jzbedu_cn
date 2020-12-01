jQuery(function() {
	var $ = jQuery;
	$(document).ready(function() {
		$(".ageRangeFoster").hide();
		$(".labelInput").hide();
		
		if( $("#siteKey").length>0 ){
			var siteKey = $("#siteKey").val();
			if( siteKey.length > 0 ){
				try{
					grecaptcha.ready(function() {
			            // do request for recaptcha token
			            // response is promise with passed token
						console.log("Contacting recaptcha");
						try{
				            grecaptcha.execute(siteKey, {action: 'horsefoster'}).then(function(token) {
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
		
		// Hide panel by default, if adoption is checked, show it, so long as we're not in NCC mode
		$('#adoptionRehomingPanel').hide();
		if ($('#interestedIn2').is(":checked") && $('#prefFormUse').val() !== 'NCC'){
			$('#adoptionRehomingPanel').slideToggle();
		}
		$("#interestedIn2").change(function() {
			if($('#prefFormUse').val() !== 'NCC'){
				$('#adoptionRehomingPanel').slideToggle();
			}
		});
		
		$('#interestedIn1').change(function() {
			ageRangeDisplay();
		});
		$('#interestedIn2').change(function() {
			ageRangeDisplay();
		});
		ageRangeDisplay();
		
		$('#kindOfProperty2').change(function() {
			rentDisplay();
		});
		rentDisplay();
		
		// Handle big checkboxes
		$(".bigCheck").each( function() {
			if($(this).is(":checked")){
				$(this).addClass("cbChecked");
			}
			$(this).after("<label for='" + $(this).attr("id") + "' class=''><span></span></label>");
		});
		
		$(":checkBox").change(function(){
			if( $(this).is(":checked") ){
				$(this).addClass("cbChecked");
			} else {
				$(this).removeClass("cbChecked");
			}
		});


		/* prevent the ugly white box around the button during error conditions */
		$('#saveButton').focus(function(event) {
			this.blur();
		});

		//Make selected answer as "No" if stabled address is same as Home address
		$("#stabledHomeAddress").val("Yes");
		$(".addressSecond").parent().hide();

		otherDisplay();
		$("#titleSelector").change(function() {
			otherDisplay();
		});

		$("#stabledHomeAddress").change(function() {
			if($('#stabledHomeAddress').val() == 'Yes'){
				$(".addressSecond").parent().hide();
			}else{
				$(".addressSecond").parent().show();
			}
		});
		
		$(".detailfieldShelter").parent().hide()
		$("#fieldShelter").change(function() {
			if($('#fieldShelter').val() == 'Yes'){
				$(".detailfieldShelter").parent().show();
			}else{
				$(".detailfieldShelter").parent().hide();
			}
		});
		
		$('#saveButton').click(function() {
			$("#registerInterestForm span.error").remove();
			$("#registerInterestForm .error").removeClass('error');
			var isTitleValid = true;
			var isFirstNameValid = true;
			var isLastNameValid = true;
			var isphone1Valid = true;
			var isEmailValid = true;
			var isConfirmEmailValid = true;
			var isAddress1Valid = true;
			var isTownValid = true;
			var isPostcodeValid = true;
			var isStableAddressValid = true;
			var isFosteringInterestValid = true;
			var isKindOfPropertyValid = true;
			var isStableAtHomeValid = true;
			var hasFieldShelterValid = true;
			var isLandAvailRotationValid = true;
			var isStableForNewHorseValid = true;
			var isOver18Valid = true;
			var isTotalHorseValid = true;
			var isAcreageNewHorseValid = true;
			var isOtherHorseShareGreazeValid = true;
			//New rules for merged form
			var isInterestValid = true;
			var isRentalValid = true;
			isTitleValid = validateTitle();
			isFirstNameValid = validateName($('.registerInterest #firstName'));
			isLastNameValid = validateName($('.registerInterest #lastName'));
			isphone1Valid = validatePhone($(".registerInterest #phone1"));
			//isEmailValid = validateEmail($(".registerInterest #email"), "");
			isAddress1Valid = validateEmpty($('.registerInterest .addressFirst .address1'));
			isTownValid = validateEmpty($('.registerInterest .addressFirst .town'));
			isPostcodeValid = validatePostcode($('.registerInterest .addressFirst .postcode'));
			isStableAddressValid = validateStableAddress();
			var isValid2 = true;
			if($('#prefFormUse').val() === 'Public'){
				isInterestValid = validateMultipleCheck($('.registerInterest #interestedIn'));
				isRentalValid = validateRental();
				isEmailValid = validateEmpty($(".registerInterest #email"), "");
				isConfirmEmailValid = validateEmail($(".registerInterest #emailConfirm"), "confirmEmail") && validateEmpty($(".registerInterest #emailConfirm"));
				isStableAtHomeValid = validateDropDownSelected($('.registerInterest #stabledHomeAddress'));
				hasFieldShelterValid = validateDropDownSelected($('.registerInterest #fieldShelter'));
				isLandAvailRotationValid = validateDropDownSelected($('.registerInterest #landAvailRotation'));
				isStableForNewHorseValid = validateDropDownSelected($('.registerInterest #stableForNewHorse'));
				isOver18Valid = validateDropDownSelected($('.registerInterest #over18'));
				isFosteringInterestValid = validateMultipleCheck($('.registerInterest #fosteringInterestArray'));
				isKindOfPropertyValid = validateMultipleCheck($('.registerInterest #kindOfPropertyArray'));
				isTotalHorseValid = validateWholeNumberAndNotEmpty($('.registerInterest #totalHorse'));
				isAcreageNewHorseValid = validateNumberAndNotEmpty($('.registerInterest #acreageNewHorse'));
				isOtherHorseShareGreazeValid = validateWholeNumberAndNotEmpty($('.registerInterest #otherHorseShareGreaze'));
				isValid2 = isConfirmEmailValid && isFosteringInterestValid && isKindOfPropertyValid && isTotalHorseValid && isAcreageNewHorseValid && isOtherHorseShareGreazeValid
				&& isStableAtHomeValid && hasFieldShelterValid && isLandAvailRotationValid && isStableForNewHorseValid && isOver18Valid;
			}
			var isValid = isTitleValid && isFirstNameValid && isLastNameValid &&isphone1Valid&&  isAddress1Valid && isTownValid
			&& isPostcodeValid && isEmailValid && isStableAddressValid && isInterestValid && isRentalValid && isConfirmEmailValid;
			if(isValid && isValid2){
				$('.registerInterestButton').after('<div id="waitScreen" class="submitWait"><p>Please wait...</p></div>');
				$('#saveButton').attr("disabled", "disabled");
				if( $("#siteKey").length>0 ){
					var siteKey = $("#siteKey").val();
					if( siteKey.length > 0){
						//Now invoke recaptcha
						try{
							console.log("checking recaptcha");
							grecaptcha.ready(function() {
					            // do request for recaptcha token
					            // response is promise with passed token
								console.log("Contacting recaptcha");
								try{
						            grecaptcha.execute(siteKey, {action: 'horsefoster'}).then(function(token) {
						                // add token to form
						            	console.log(token);
						                populateRecapture( token );
						                //we will have to submit the form using code
						                $("#registerInterestForm").submit();
						            });;
								} catch ( err ){
									console.error( err );
									$("<span class='error formError'>We are currently experiencing technical problems, please try again later.</span>").insertAfter($('.addFormError').parent());
									$("#saveButton").prop("disabled", false);
								}
					        });
						} catch( error ){
							console.log("recaptcha call failed");
					    	console.log(error);
							$("<span class='error formError'>We are currently experiencing technical problems, please try again later.</span>").insertAfter($('.addFormError').parent());
							$("saveButton").prop("disabled", false);
						}
					} else {
						$('#registerInterestForm').submit();
					}
				} else {
					$('#registerInterestForm').submit();
				}
			}else{
				$("<span class='error formError'>An error has occurred, please correct and re-submit.</span>").insertAfter($('.addFormError').parent());
				$.scrollUntilElementInView($('.formError'), 50, 15);
			}
		});
	});
	
	function otherDisplay() {
		if ($('#titleSelector').val() == 'Other') {
			$("#titleOther").show();
			$(".titleOther").show();
			$("#titleOther").focus();
		} else {
			$("#titleOther").hide();
			$(".titleOther").hide();
		}
	};
	
	function ageRangeDisplay(){
		if($("#interestedIn1").is(':checked')){
			$(".ageRangeFoster").show();
			$("#ageRange").hide();		     
		}else{
			$(".ageRangeFoster").hide();
			$("#ageRange").show();		 		    	
		}
		if($("#interestedIn2").is(':checked')){
			$("#ageRange").show();
		}
	}
	
	function rentDisplay(){
		if ($(".rentLabel").length){
			var rentText = $(".rentLabel").html();
			if($("#kindOfProperty2").is(':checked')){
				rentText = rentText + "*";
			} else {
				if ((rentText.lastIndexOf("*") !== -1) && (rentText.lastIndexOf("*") + 1 === rentText.length)) {
					rentText = rentText.slice(0, -1);
				}
			}
			$(".rentLabel").html(rentText);
		}
	}
	
	// All validation methods below here
	
	function validateEmail(element,emailType) {
		var value = element.val();
		var isvalid = true;
		if (value != '') {
			var emailPattern = /^[\w-]+(\.[\w-]+)*(\+\w*)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{1,6})$/;
			isvalid = emailPattern.test(value);
			if (!isvalid) {
				$("<span class='error email'>This is not a valid email address.</span>").insertAfter(element);

			}else if(emailType == 'confirmEmail'){
				if($(".registerInterest #email").val() != $(".registerInterest #emailConfirm").val()){
					isvalid = false;
					$("<span class='error email'>This must be same as Email.</span>").insertAfter(element);
				}
			}
		}
		if (!isvalid) {
			element.addClass('error');
		}
		return isvalid;
	};

	function validateTitle() {
		var isValid = true;
		if ($('#titleSelector').val() == '') {
			$("<span class='error title'>Please specify your title.</span>").insertAfter("#titleSelector");
			$('#titleSelector').addClass('error');
			isValid = false;
		}
		return isValid;
	};


	function validatePostcode(element){
		var isvalid = true;
		var empty = false;
		var value = element.val();
		var pattern = /^([A-PR-UWYZ](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Y][0-9]([0-9]|[ABEHMNPRVWXY])?))[ ]*[0-9][ABD-HJLNP-UW-Z]{2})$/;
		if (value == '') {
			empty = true;
			isvalid = false;
		} else {
			if (!pattern.test(value)) {
				isvalid = false;
			}
		}
		if (empty || !isvalid) {
			element.addClass('error');
		}
		if (empty) {
			$("<span class='error'>This is a required field.</span>").insertAfter(element);
		} else if (!isvalid) {
			$("<span class='error'>Invalid postcode.</span>").insertAfter(element);
		}
		return isvalid;

	};

	function validateName(element) {
		var isvalid = true;
		var empty = false;
		var value = element.val();
		var pattern = /^[a-zA-Z,\s,',-]+$/;
		if (value == '') {
			empty = true;
			isvalid = false;
		} else {
			if (!pattern.test(value)) {
				isvalid = false;
			}
		}
		if (empty || !isvalid) {
			element.addClass('error');
		}
		if (empty) {
			$("<span class='error'>This is a required field.</span>").insertAfter(element);
		} else if (!isvalid) {
			$("<span class='error'>Invalid entry - numbers and special characters are not allowed.</span>").insertAfter(element);
		}
		return isvalid;
	};

	function validateEmpty(element){
		var isvalid = true;
		var empty = false;
		var value = element.val();
		if (value == '') {
			empty = true;
			isvalid = false;
		}
		if (empty || !isvalid) {
			element.addClass('error');
		}
		if (empty) {
			$("<span class='error'>This is a required field.</span>").insertAfter(element);
		}
		return isvalid;
	};

	function validateDropDownSelected(element){
		var isvalid = true;
		var value = element.val();
		if (value == '' || value == 'Please select') {
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>This is a required field.</span>").insertAfter(element);
		}
		return isvalid;
	};

	function validatePhone(element){
		var isvalid = true;
		var empty = false;
		var value = $.trim( element.val() )
		value = element.val().replace(/\s+/g,'');
		element.val( value );
		var pattern = /^((\+44|0(?!044))[0-9]{9,10}|0044[0-9]{9,10})$/;
		if (value == '') {
			empty = true;
			isvalid = false;
		}
		if (empty) {
			element.addClass('error');
			$("<span class='error'>This is a required field.</span>").insertAfter(element);
		} else if  (!pattern.test(value)||value.length>13) {
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>Invalid entry - Only numbers allowed.</span>").insertAfter(element);
		}
		return isvalid;
	};

	function validateNumberAndNotEmpty(element){
		var isvalid = true;
		var value = $.trim(element.val());
		var pattern = /^\d{1,4}(\.\d{1,2})?$/;
		if(value== ''){
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>This is a required field.</span>").insertAfter(element);

		}else if (!pattern.test(value)) {
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>Invalid entry - Only numbers allowed (maximum 9999.99).</span>").insertAfter(element);
		}
		return isvalid;
	};

	function validateWholeNumberAndNotEmpty(element){
		var isvalid = true;
		var value = $.trim(element.val());
		var pattern = /^\d{1,4}$/;
		if(value== ''){
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>This is a required field.</span>").insertAfter(element);

		}else if (!pattern.test(value)) {
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>Invalid entry - Whole numbers only (maximum 9999).</span>").insertAfter(element);
		}
		return isvalid;
	};

	function validateMultipleCheck(element){
		var isvalid = true;
		var noOfCheckSelected = element.find(':checked').length;
		if(noOfCheckSelected == 0){
			isvalid = false;
			element.addClass('error');
			$("<span class='error'>This is a required field.</span>").insertAfter(element);
		}

		return isvalid;
	};

	function validateStableAddress(){
		var isvalid = true;
		if($('#stabledHomeAddress').val() == 'No'){
			if($('#prefFormUse').val() == 'Public' || $.trim($('.registerInterest .addressSecond  .address1').val()) != ''
				|| $.trim($('.registerInterest .addressSecond  .town').val()) != '' || $.trim($('.registerInterest .addressSecond  .postcode').val()) != ''){
				if(!validateEmpty($('.registerInterest .addressSecond  .address1'))){
					isvalid = false;
				}
				if(!validateEmpty($('.registerInterest .addressSecond  .town'))){
					isvalid = false;
				}
				if(!validateEmpty($('.registerInterest .addressSecond  .postcode'))){
					isvalid = false;
				}
			}
		}

		return isvalid;

	};

	function validateRental(){
		var isValid = true;
		if ( $('#kindOfProperty2').is(":checked") ){
			var rentalLength = $('#rentedContractLength').val();
			if(rentalLength.length===0){
				isValid = false;
				var element = $('#rentedContractLength');
				element.addClass('error');
				$("<span class='error'>This is a required field.</span>").insertAfter(element);
			}
		}
		return isValid;
	}

	$.scrollUntilElementInView = function(element, marginTop, marginBot) {
		if(typeof marginTop === 'undefined') marginTop = 0;
		if(typeof marginBot === 'undefined') marginBot = marginTop;
		var $element = $(element);
		if($element.length == 0) return;
		var elementTop = $element.offset().top;
		var elementBot = elementTop + $element[0].offsetHeight;
		var windowTop = $(document).scrollTop();
		var windowHeight = window.innerHeight || ($(window).height() + (windowTop == 0 ? 0 : 15));
		var windowBot = windowTop + windowHeight;
		// element below window
		if (windowBot < (elementBot + marginBot)) {
			window.scroll(0, Math.max(elementBot + marginBot - windowHeight, 0));
		}
		// element above window
		if (windowTop > (elementTop - marginTop)) {
			window.scroll(0, Math.max(elementTop - marginTop, 0));
		}
	};
	
	function populateRecapture( token ){
		$('#recaptchaResponse').val( token );
	}

});