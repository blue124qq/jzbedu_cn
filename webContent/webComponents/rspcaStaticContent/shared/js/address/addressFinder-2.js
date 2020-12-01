(function (root, factory) {
	root["AddressFinder"] = factory(root["Handlebars"])
} (this, function(handlebars) {

	// Create an address finder function definition for module instantiability
	var AddressFinder = function() {
		
		// when instantiating this object return a unique instance of the addressFinder
		// by using jquery extend to make a clone of the parent
		return $.extend({}, (function () {
			//private scoped variables and methods

			// configuration the module uses to build itself
			var	config = {
				addressSelector: "",
				addressRestService: window.location.origin + "/o/address-finder/address-finder",
				uid: "",
				explanationText: "",
				titleText: "",
				currentAddress: "",
				showPostcodeLookup: true,
				postcodeLookupLabel: "",
				useSearchIcon: true,
				supporter: {},
				updateCallbackFunction: null,
				useOnBlurValidation: true,
				showHouseNumber: false,
				showOverseasButton: false,
				showAdditionalText: false,
				additionalTextLabel: ""
			};

			// replace configuration values with those passed in at init
			updateConfig = function(newConfig) {
				for (key in config) {
					if (typeof(newConfig[key]) !== "undefined") {
						config[key] = newConfig[key];
					}
				}
			};

			// validate the postcode lookup field before searching
			var validatePostcodeLookup = function() {
				var domElem = '#' + config.uid + 'postcodeLookup';
				removeError(domElem);
				if ($(domElem).val() == "") {
					renderError(true, domElem, "Please find your address.");
					return false;
				} else {
					return postcodeValidator(domElem, "Please enter a valid postcode.");
				}
			};

			// check postcode validity of a postcode DOM element
			var postcodeValidator = function(selector, errorMsg) {
				var flag = true;
				var pattern = /^([A-PR-UWYZ](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Y][0-9]([0-9]|[ABEHMNPRVWXY])?))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/;
				$(selector).val( $(selector).val().toUpperCase() );
				flag = pattern.test($(selector).val().trim().toUpperCase());
				renderError(!flag, selector, errorMsg);
				return flag;
			};

			// check required validaty of a DOM element
			var requiredValidator = function(selector, errorMsg) {
				var flag = true;

				flag = $(selector).val().trim() != "";
				renderError(!flag, selector, errorMsg);

				return flag;
			};

			// render the address finder into the provided HTML DOM element provided in configuration
			var renderAddressFinder = function() {
				var jsonData = {
					uid: config.uid,
					showExplanationText: !config.explanationText == "",
					explanationText: config.explanationText,
					showTitleText: !config.titleText == "",
					titleText: config.titleText,
					showPostcodeLookup: config.showPostcodeLookup,
					showPostcodeLookupLabel: !config.postcodeLookupLabel == "",
					postcodeLookupLabel: config.postcodeLookupLabel,
					useSearchIcon: config.useSearchIcon,
					showHouseNumber : config.showHouseNumber,
					showOverseasButton : config.showOverseasButton,
					showCurrentAddress: !(typeof(config.supporter.address) == "undefined") && config.supporter.address.address1 != "",
					supporter: config.supporter,
					showAdditionalText: config.showAdditionalText,
					additionalTextLabel: config.additionalTextLabel,
					showAdditionalTextLabel: !config.additionalTextLabel == ""
				};
				var target = config.addressSelector;

				$.get('/webContent/webComponents/rspcaStaticContent/shared/js/address/templates/addressFinder.hbs?a=13', function (data) {
				    var template=handlebars.compile(data);
				    $(target).html(template(jsonData));

					// apply the DOM functions required for address lookup
				    $('#' + config.uid + 'postcodeLookup').on('keyup', function() {
				    	toggleLookup($('#' + config.uid + 'postcodeLookup').val())
				    });
			    	$('#' + config.uid + 'postcodeLookupButton').on("click", function() {
			    		getPostalAddress();
			    	});
			    	$('#' + config.uid + 'toggleManualAddress').on("click", function() {
			    		toggleManualAddress();
			    	})
			    	$('#' + config.uid + 'toggleOverseasAddress').on("click", function() {
			    		$('#' + config.uid + 'userAddressManualSection').show();
			    		$('#' + config.uid + 'toggleManualAddress').hide;
			    		$('#country-wrapper').show();
			    		$('#ukUser').val("false");
			    		toggleManualAddress();
			    	})

			    	if (config.useOnBlurValidation) {
				    	// apply the DOM functions for validation
			    		$('#' + config.uid + 'address1').on("blur", function() {
			    			validateAddress1();
			    		})

			    		$('#' + config.uid + 'town').on("blur", function() {
			    			validateTown();
			    		})

			    		$('#' + config.uid + 'postcode').on("blur", function() {
			    			if( !$('#' + config.uid + 'country').is(":visible") ){
			    				validateAddressPostcode();
			    			}
			    		})
			    		
			    		$('#' + config.uid + 'country').on("blur", function() {
			    			if( $('#' + config.uid + 'country').is(":visible") ){
			    				validateCountry();
			    			}
			    		})

			    	}
				}, 'html')
			};

			// render address list options returned from AJAX request
			var renderAddressOptions = function(addressList) {
				for (var i = 0; i < addressList.length; i++) {
					var addressVals = addressList[i].fulladdress.split('||');
					var selectAddress = addressList[i].address1 + ', ' + addressList[i].address2;
					addressList[i].selectAddress = selectAddress;
				}

				$.get('/webContent/webComponents/rspcaStaticContent/shared/js/address/templates/options.hbs?a=1', function(data) {
					var template = handlebars.compile(data);
					$('#' + config.uid + 'addressSelectList').html(template({addressList: addressList}));
					$('#' + config.uid + 'addressSelectList').on("change", function(event) {
						$('#' + config.uid + 'addressSelectList').off("change");
						$('#' + config.uid + 'userAddressOverseasButton').hide();
						event.stopPropagation();
						$('#' + config.uid + 'hasSearched').val("false");
						var val = $(this).children("option:selected").data("fullAddress");
						var label = $(this).children("option:selected").data("displayAddress");
						var additionalText = $(this).children("option:selected").data("additionalText");

						setChosenPostalAddress(val, label, additionalText);
					})
				})
			};
			
			// render errors under inputs
			var renderError = function(flag, selector, error) {
				if (flag) {
					$.get('/webContent/webComponents/rspcaStaticContent/shared/js/address/templates/error.hbs', function (data) {
						removeError(selector);
					    var template=handlebars.compile(data);
					    if ($(selector).length) {
					    	$(selector).parent().addClass("has-error");
					    	$(selector).after(template({error: error}));
					    }
					}, 'html')
				} else {
					$(selector).parent().addClass("has-success");
				}
			}

			// remove errors from inputs
			var removeError = function(selector) {
				$(selector).parent().removeClass("has-error").removeClass("has-success");
				$(selector).siblings(".form-validator-stack").remove();
			}

			// toggle whether the lookup button should be active
			var toggleLookup = function(postcode) {
				if (typeof(postcode) == "undefined" || String(postcode) == "") {
					$('#' + config.uid + 'postcodeLookupButton').attr('disabled', true);
					$('#' + config.uid + 'postcodeLookupButton').toggleClass('disabled', true);	
				} else {
					$('#' + config.uid + 'postcodeLookupButton').attr('disabled', false);
					$('#' + config.uid + 'postcodeLookupButton').toggleClass('disabled', false);	
				}
			};

			// retrieve address list from the configured endpoint
			var getPostalAddress = function() {
				$('#' + config.uid + 'displaySection').html('');
				$('#' + config.uid + 'addressSelectList').empty().hide();
				$("#" + config.uid + "userAddressManual").hide();

				$('#' + config.uid + 'address1').val("");
				$('#' + config.uid + 'address2').val("");
				$('#' + config.uid + 'town').val("");
				$('#' + config.uid + 'postcode').val("");
				$('#' + config.uid + 'pafAddress').val('false');

				$('#' + config.uid + 'additionalTextArea').hide();
				$('#' + config.uid + 'additionalText').html("");

				if (validatePostcodeLookup()) {
					var restService = config.addressRestService;

					// if using rest service
					restService += "?postcode=" + $('#' + config.uid + 'postcodeLookup').val();
					if ($('#' + config.uid + 'housenoLookup').val() != "") {
						restService += "&houseno=" + $('#' + config.uid + 'housenoLookup').val();
					}

					// if using liferay resource
					var data = {};
					data[config.uid + "postcodeLookup"] = $('#' + config.uid + 'postcodeLookup').val();
					data[config.uid + "housenoLookup"] = $('#' + config.uid + 'housenoLookup').val();

					$.ajax(
						restService,
						{
							dataType: "json",
				            cache : false,
							data: data,
							success: function(responseData) {
								$("#" + config.uid + "userAddressManualButton").show();
								$('#' + config.uid + 'userAddressManualSection').show();
								$("#" + config.uid + "userAddressOverseasButton").hide();
								if (responseData) {
									if (responseData.length == 0) {
										$('.postcodeLookup .help-block').remove();
										renderError(true, $('#' + config.uid + 'postcodeLookup'), "Address not found.");
									} else if (responseData.length == 1) {
										var item = responseData[0];
										$('#' + config.uid + 'address1').val(item.address1);
										$('#' + config.uid + 'address2').val(item.address2);
										$('#' + config.uid + 'town').val(item.town);
										$('#' + config.uid + 'postcode').val(item.postcode);
										$('#' + config.uid + 'pafAddress').val('true');
										$('#' + config.uid + 'displaySection').html('<p>' + item.displayaddress + '</p>');
										if (typeof(item.additionalText) != "undefined") {
											$('#' + config.uid + 'additionalTextArea').show();
											$('#' + config.uid + 'additionalText').html(item.additionalText);
										}
										callUpdateCallback();
									} else {
										renderAddressOptions(responseData);
										$('#' + config.uid + 'addressSelectList').show();
									}
								}
							}
						}
					);
				} else {
					$("#" + config.uid + "userAddressManualButton").show();
					$('#' + config.uid + 'userAddressManualSection').show();
				}
			};

			// show manual address input boxes when user asks to enter manually
			var toggleManualAddress = function() {
				$('#' + config.uid + 'userAddressManual').show();
				$('.postcodeLookup .help-block').remove();

				$('#' + config.uid + 'address1').val('');
				$('#' + config.uid + 'address2').val('');
				$('#' + config.uid + 'town').val('');
				$('#' + config.uid + 'postcode').val('');
				$('#' + config.uid + 'pafAddress').val('false');
				$('#' + config.uid + 'displaySection').html('');

				removeError('#' + config.uid + 'address1');
				removeError('#' + config.uid + 'town');
				removeError('#' + config.uid + 'postcode');
				$("#" + config.uid + "userAddressManualButton").hide();
				$("#" + config.uid + "userAddressOverseasButton").hide();
				$('#' + config.uid + 'addressSelectList').empty().hide();
			};

			// set the postal address for the selected option from the options list
			var setChosenPostalAddress = function(val, label, additionalText) {
				$('#' + config.uid + 'displaySection').html('');

				if (val) {
					var values = val.split('||');
					if (values && values.length > 0) {
						$('#' + config.uid + 'address1').val(values[0]);
						$('#' + config.uid + 'address2').val(values[1]);
						$('#' + config.uid + 'town').val(values[3]);
						$('#' + config.uid + 'postcode').val(values[4]);
						$('#' + config.uid + 'pafAddress').val('true');
						$('#' + config.uid + 'displaySection').html('<p>' + label + '</p>');
						if (typeof(additionalText) != "undefined" && additionalText != "") {
							$('#' + config.uid + 'additionalTextArea').show();
							$('#' + config.uid + 'additionalText').html(additionalText);
						}
						callUpdateCallback();
					}
				} else {
					$('#' + config.uid + 'address1').val('');
					$('#' + config.uid + 'address2').val('');
					$('#' + config.uid + 'town').val('');
					$('#' + config.uid + 'postcode').val('');
					$('#' + config.uid + 'pafAddress').val('false');
					$('#' + config.uid + 'displaySection').html('');			
				}
				$('#' + config.uid + 'addressSelectList').empty().hide();
				$("#" + config.uid + "userAddressOverseasButton").hide();
			};

			// call registered function in case implementing code requires knowledge of the address fields
			var callUpdateCallback = function() {
				if (config.updateCallbackFunction != null) {
					config.updateCallbackFunction();
				}
			};

			// validate the address1 field
			var validateAddress1 = function() {
				var domElem = '#' + config.uid + 'address1';
				removeError(domElem);

				return requiredValidator(domElem, "Please enter a valid first line of address.");
			};

			// validate the town field
			var validateTown = function() {
				var domElem = '#' + config.uid + 'town';
				removeError(domElem);

				return requiredValidator(domElem, "Town/city is required.");
			};
			
			// validate the postcode field in the manual section
			var validateAddressPostcode = function() {
				var domElem = '#' + config.uid + 'postcode';
				removeError(domElem);

				return requiredValidator(domElem, "Postcode is required.") &&
					postcodeValidator(domElem, "Please enter a valid postcode.");
			};
			
			// validate the country field
			var validateCountry = function() {
				var domElem = '#' + config.uid + 'country';
				removeError(domElem);
				return requiredValidator(domElem, "Country is required.");
			};

			// return the text in the additionalText field
			var getAdditionalTextField = function() {
				return $('#' + config.uid + 'additionalText').html();
			}

			//public scoped variables and methods
			return {
				// initialise the address finder object
				initAddressFinder:function(config) {
					updateConfig(config);
					renderAddressFinder();
				},

				// remove all errors in this module
				clearAllErrors:function() {
					$('#' + config.uid + 'addressSection .form-validator-stack').remove();
					$('#' + config.uid + 'addressSection .has-error').removeClass('has-error');
					$('#' + config.uid + 'addressSection .has-success').removeClass('has-success');
				},

				// validate whether postcodeLookup is used
				validateAddressFound:function() {
					var hasAddress = this.validateAddress();
					if (!hasAddress) {
						renderError(true, '#' + config.uid + 'postcodeLookup', "Please find your address.");
					}
					return hasAddress;
				},

				// validate the entirety of the address
				validateAddress:function() {
					var flag = true; 

					flag = validateAddress1() ? true && flag : false;
					flag = validateTown() ? true && flag : false;
					flag = validateAddressPostcode() ? true && flag : false;

					return flag;
				},

				getAdditionalText:function() {
					return getAdditionalTextField();
				}
			}
		}()))
	};

	return AddressFinder;
}));