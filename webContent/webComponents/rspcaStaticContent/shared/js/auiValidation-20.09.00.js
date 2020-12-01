AUI().use('aui-form-validator', function(A) {
	var defaultFormValidator = A.config.FormValidator;
 
	A.mix(
		defaultFormValidator.RULES,
		{
			firstName: function (value, fieldNode, ruleValue) {
				var pattern = /^[a-zA-Z,\s',',-]+$/;
				return pattern.test(value);
			},
			lastName: function (value, fieldNode, ruleValue) {
				var pattern = /^[a-zA-Z,\s',',-]+$/;
				return pattern.test(value);
			},
			email: function (value, fieldNode, ruleValue) {
				var pattern = /^[\w-]+(\.[\w-]+)*(\+\w*)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{1,6})$/;
				return pattern.test(value);
			},

			telephone: function (value, fieldNode, ruleValue) {
				var pattern = /^[0][0-9]{10}$/;
				var pattern2 = /^(?!0|7)\d{10}$/;
				return (pattern.test(value) || pattern2.test(value));
			},
			mobile: function (value, fieldNode, ruleValue) {
				var pattern=/^[0][7][0-9]{9}$/;
				return pattern.test(value);
			},
			currency: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length===0 ){
					var pattern = /^\d+(\.\d{1,2})?$/;
					return pattern.test(value);
				} else {
					return true;
				}
			},
			alphaNumeric: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length===0 ){
					var pattern = /^[a-z-A-Z0-9.,! -]+$/;
					return pattern.test(value);
				} else {
					return true;
				}
			},
			postcode: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length===0 ){
					var pattern = /^([A-PR-UWYZ](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Y][0-9]([0-9]|[ABEHMNPRVWXY])?)) {0,1}[0-9][ABD-HJLNP-UW-Z]{2})$/;
					return pattern.test(value.toUpperCase());
				} else {
					return true;
				}
			},
			wholeNumber: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length===0 ){
					var pattern = /^[-+]?\d+$/;
					return pattern.test(value);
				} else {
					return true;
				}
			},
			date: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length==0) {
					var dateArray = value.split("-");
					var date = new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
					if (date.getFullYear() == dateArray[2]
							&& date.getMonth() == (dateArray[1]-1)
							&& date.getDate() == dateArray[0]) {
						return true;
					}
					return false;
				} else {
					return true;
				}
			},
			datePast: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length==0) {
					var today = new Date().setHours(0,0,0,0);
					var dateArray = value.split("-");
					var date = new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
					if (today - date > 0) {
						return true;
					}
					return false;
				} else {
					return true;
				}
			},
			dateFuture: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length==0) {
					var today = new Date().setHours(0,0,0,0);
					var dateArray = value.split("-");
					var date = new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
					if (today - date < 0) {
						return true;
					}
					return false;
				} else {
					return true;
				}
			},			
			overEighteen: function (value, fieldNode, ruleValue) {
				if( fieldNode.attr("skipvalidationtargetselector").length==0) {
					var dateArray = value.split("-");
					dob = new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
					today = new Date();

					var diff = today.getYear() - dob.getYear();
					if (today.getMonth() < dob.getMonth()
							|| (today.getMonth() == dob.getMonth()
							&& today.getDate() < dob.getDate())
					) {
						diff--;
					}

					return diff < 18;
				} else {
					return true;
				}
			}
		},
		true
	);
    
	A.mix(
		defaultFormValidator.STRINGS,
		{
			firstName: 'Please enter a valid first name',
			lastName: 'Please enter a valid last name',
			email: 'Please enter a valid email',
			telephone: 'Please enter a valid telephone number',
			mobile: 'Please enter a valid mobile number',
			currency: 'Please enter a valid currency value (no commas and only 2 digits after the decimal)',
			alphaNumeric: 'Please enter letters and numbers only',
			postcode: 'Please enter valid postcode',
			wholeNumber: 'Please enter whole numbers only',
			date: 'Please enter a valid date',
			datePast: 'Please enter a valid date in the past',
			dateFuture: 'Please enter a valid date in the future',
			overEighteen: 'The date entered is not under 18'
		},
		true
	);
});
