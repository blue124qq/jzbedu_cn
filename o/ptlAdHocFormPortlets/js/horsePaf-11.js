jQuery(function(){
	var $=jQuery;

		$(document).ready(function() {
			var listOfAddresses;
			    $('.registerInterest .ukaddress').show();
				$('.registerInterest .addressList').hide();
				$(".registerInterestOuter .postcodeCapture").keypress(function(event) {
					  if ( event.which == 13 ) {
				    	  var initPostcode = $(this).val().trim();
				    	  $(this).val( initPostcode );
						  ajaxAddress( $(this).parent().find(".findAddressLink") );
						  return false;
					   }
				});
				
				$('.registerInterest .findAddressLink').click(function() {
					//trim lead and trailing space
		    	    var initPostcode = $(this).parent().find(".postcodeCapture").val().trim();
		    	    $(this).parent().find(".postcodeCapture").val( initPostcode );
					return ajaxAddress($(this));
				});

				$('.registerInterest .noaddressfound').click(function() {
					$(this).parent().parent().parent().find('.pathValidated').val('false');
					$(this).parent().parent().parent().find('.addressesList option').remove();
					$(this).parent().parent().parent().find('.addressList').hide();
					$(this).parent().parent().parent().find('.labelInput').hide();
					$(this).parent().parent().parent().find('.inputAddress').show();
					$(this).parent().parent().parent().find('.address1').show();
					$(this).parent().parent().parent().find('label.labelAddress1').hide();
					return false;

				});

				$('.registerInterest select.addressesList').change(function() {
					var indexNo = $(this).attr('value');
					var address = listOfAddresses[indexNo];
					setAddressDetails(address,$(this));
					$(this).parent().parent().parent().find('.addressesList option').remove();
					$(this).parent().parent().parent().find('.addressList').hide();
				});

				function ajaxAddress(element){
					$(element).parent().parent().parent().find('span.error').remove();
					$(element).parent().parent().parent().find('.error').removeClass('error');
					$(element).parent().parent().parent().find('.waitScreen').remove();
					$(element).parent().parent().parent().find('.addressesList option').remove();
					$(element).parent().parent().parent().find('.addressList').hide();
						if(validateFindPostcode($(element).parent().parent().parent().find('.postcodeCapture'), $(element))){
							var houseNo = $(element).parent().parent().parent().find('.houseCapture').val();
							var postcode = $(element).parent().parent().parent().find('.postcodeCapture').val();
							if(!$(element).hasClass('clicked')){
								ajaxCallForAddressList( $("#ajaxUrl").val() ,houseNo,postcode,$(element));
							}
							$(element).addClass("clicked");
							return false;
						}else{
							return false;
						}
 				}
				
				function ajaxCallForAddressList(uniqueUrl,houseNo,postcode, currentElement) {
					currentElement.parent().parent().parent().find('.findAddressBlock').append('<div id="waitScreen">&nbsp;</div>');
					$.getJSON(uniqueUrl,
								{
									houseNo : houseNo,
									postcode : postcode
								}
								, function(data) {
									$(currentElement).removeClass("clicked");
									if(data.addresses.length == 0){
										$("<span class='error'>Address not found.</span>").insertAfter(currentElement);
									}else if(data.addresses.length == 1){
										setAddressDetails(data.addresses[0],currentElement);
									}else if(data.addresses.length > 0){
										currentElement.parent().parent().parent().find('.addressList').show();
										listOfAddresses = data.addresses;
										getList(data.addresses,currentElement );
									}
									currentElement.parent().parent().parent().find('#waitScreen').remove();
							}
						);
					$(currentElement).removeClass("clicked");
				};

					function getList(addressList,currentElement){
							$.each(addressList, function(index,addressList) {
								currentElement.parent().parent().parent().find('.addressesList').append('<option value="'+index+'">'+addressList.address1 + " " + addressList.address2+'</option>');
							});
					};

					$(window).resize(function(){

						var addressSelectBox = $('.registerInterest #homeAddress');
						var stablingSelectBox = $('.registerInterest #stablingAddress');

						if(addressSelectBox.length == 0) { return; }
						if(stablingSelectBox.length == 0) { return; }

						if (isTouchscreenDevice) {
							addressSelectBox[0].size = 1;
							stablingSelectBox[0].size = 1;

							if(addressSelectBox.children('option').length != 0) {
								if(addressSelectBox.children('option.placeholder').length == 0) {
									addressSelectBox.prepend(
											'<option value="" style="display:none" selected="selected">Please select</option>');
								}
							}

							if(stablingSelectBox.children('option').length != 0) {
								if(stablingSelectBox.children('option.placeholder').length == 0) {
									stablingSelectBox.prepend(
											'<option value="" style="display:none" selected="selected">Please select</option>');
								}
							}

						} else {
							addressSelectBox[0].size = 4;
							addressSelectBox.children('option.placeholder').remove();
							stablingSelectBox[0].size = 4;
							stablingSelectBox.children('option.placeholder').remove();
						}
					});

					function setAddressDetails(address, currentElement){
						if(null != address){
							currentElement.parent().parent().parent().find(".labelInput").show();
							currentElement.parent().parent().parent().find('.address1').val(address.address1);
							currentElement.parent().parent().parent().find('.address1Check').val(address.address1);
							currentElement.parent().parent().parent().find('label.labelAddress1').html(address.address1);

							currentElement.parent().parent().parent().find('.address2').val(address.address2);
							currentElement.parent().parent().parent().find('label.labelAddress2').html(address.address2);

							currentElement.parent().parent().parent().find('.address3').val(address.address3);
							currentElement.parent().parent().parent().find('label.labelAddress3').html(address.address3);

							currentElement.parent().parent().parent().find('.town').val(address.town);
							currentElement.parent().parent().parent().find('label.labelTown').html(address.town);

							currentElement.parent().parent().parent().find('.postcode').val(address.postcode);
							currentElement.parent().parent().parent().find('label.labelPostcode').html(address.postcode);

							currentElement.parent().parent().parent().find('.pathValidated').val('true');

							currentElement.parent().parent().parent().find('.labelInput').show();
							currentElement.parent().parent().parent().find('.inputAddress').hide();
						}
					};

					function validateFindPostcode(element, currentElement){
						var isvalid = true;
						var empty = false;
						var value = $.trim(element.val().toUpperCase());
						element.val(value);
						var pattern = /^([A-PR-UWYZ](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Y][0-9]([0-9]|[ABEHMNPRVWXY])?))[ ]*[0-9][ABD-HJLNP-UW-Z]{2})$/;
						if (value == '') {
							empty = true;
							isvalid = false;
						} else if (!pattern.test(value)) {
								isvalid = false;
						}

						if (empty || !isvalid) {
							element.addClass('error');
						}
						if (empty) {
							$("<span class='error'>This is a required field.</span>").insertAfter(currentElement);
						} else if (!isvalid) {
							$("<span class='error'>Invalid postcode.</span>").insertAfter(currentElement);
						}
						return isvalid;

					};
					
					/**
					 * Detect whether the user is using a touchscreen device, and add the relevant class to the root html node.
					 * This is for css queries which need to know if the user has a touchscreen, not just how wide the page is.
					 */
					isTouchscreenDevice = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
					if(isTouchscreenDevice) {
						if(document.documentElement.className.indexOf('touchscreen-device') < 0) {
							document.documentElement.className += ' touchscreen-device';
						}
					} else {
						if(document.documentElement.className.indexOf('non-touchscreen-device') < 0) {
							document.documentElement.className += ' non-touchscreen-device';
						}
					}
					/** This is so the extra specificity doesn't lead to a bunch of !importants */
					if(document.documentElement.className.indexOf('any-device') < 0) {
						document.documentElement.className += ' any-device';
					}
		});

});