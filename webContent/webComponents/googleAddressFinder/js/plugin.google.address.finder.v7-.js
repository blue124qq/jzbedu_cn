
(function($) {
	var $=jQuery;
	var hasGeoCoded = false;
	$.fn.extend( {
		googleAddressFinder : function(args) {
			$('#searchedLocation').hint();

			var errorText = $.trim($('#searchedLocationConflicts').text());

			if(!errorText == '' ){
				setLocationError();
			}

			$('#addressSearchGoButton').on('click',function(event) {
				if($('#skipLocationCheck').val()!=="true"){
					$('#searchedLocationConflicts').html("");
					$('#searchedPostcode').val("");
					var value = $('#searchElement #searchedLocation').val();
					var locationValidFlag = true;
	
					/* make the text box go red */
					if (value == '' || value == 'Enter postcode or town/county') {
						setLocationError();
						$('#searchedLocationConflicts').html("Enter a postcode or town/county");
						locationValidFlag = false;
					} else {
						clearLocationError();
					}
					if( $("#previousLocation").val()!=="" && value === $("#previousLocation").val() ){
						//No need to geocode again as location not changed
						$('#searchedPostcode').val( $("#prevSearchedPostcode").val() );
						hasGeoCoded = true;
					} else {
						var geocodedpostcode=$('#searchForm #searchElement #searchedPostcode').val();
						if ($('#searchElement #searchedLocation').length > 0) {
							if (locationValidFlag && !hasGeoCoded) {
								if($.trim(geocodedpostcode)==""){
									geoCode($('#searchElement #searchedLocation').val());
								}else{
									hasGeoCoded = true;
								}
							}
						} else {
							hasGeoCoded = true;
							$('#searchForm #searchElement #searchedPostcode').val( value );
						}
					}
					return locationValidFlag && hasGeoCoded;
				} else {
					return true;
				}	
			});
			
			//Don't autosubmit if we are on the BW4 Find your event front page
			if( ( $("#findYourEvent").length === 0 || $(".eventCalendarPortlet").length === 0 ) && $("#theFindAPetPortlet").length === 0 ){
				if ( $("#emailSubscriptionPortlet").length ===0) {
					if(($('#searchedLocation').val() != 'Enter postcode or town/county') &&(($.trim($('#searchedLocation').val())).length > 0) &&
							($.trim($('#searchedPostcode').val()).length == 0)){
						$('#addressSearchGoButton').click();
					}
				}
			}
		},
		autopopulateGeolocation : function(args) {
			var suppliedPostcode = $('#searchedPostcode').val();
			if ($.trim(suppliedPostcode).length == 0 ||
				!isManualSearchInProgress()) {
				tryUseDeviceLocation(geolocationSuccess, geolocationError);
			}
		},
		showGeolocationOption : function(args) {
			tryShowGeolocationIcon(geolocationSuccess, geolocationError);
		}
	});

function geoCode(value) {
		$('#searchForm #searchedPostcode').val("");
		$('#searchedLongitude').val("");
		$('#searchedLatitude').val("");
		var patternPostcode = /^[A-Z a-z]{1,2}[0-9R][0-9A-Za-z]?[ ]*[0-9][A-Za-z]{2}$/;
		var geocoder = new google.maps.Geocoder();
			//check entry does not start or end with a digit e.g. s123,12s3,123s
		var pattern=/^\d*$/;
			if(pattern.test(value)){
				locationError();
			}else{
				geocoder.geocode({
					'address' : value + ', UK',
					'region' : 'UK'
				}, function(data, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var lat = data[0].geometry.location.lat();
						var lng = data[0].geometry.location.lng();
						$('#searchForm #searchedLatitude').val(lat);
						$('#searchForm #searchedLongitude').val(lng);
						if(!patternPostcode.test(value)) {
							geoCodeLatLng(new google.maps.LatLng(lat, lng));
						}else{
							$('#searchForm #searchedPostcode').val(value);
							hasGeoCoded = true;
							if( $("#findYourEvent").length === 0 && $("#theFindAPetPortlet").length === 0){
								$('#searchForm').submit();
							}
						}
					} else {
						locationError();
					}
				});
			}
		return false;
	}

	function geoCodeLatLng(latlng) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng' : latlng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var zipcode = getPostcode(results);
					var pattern = /^[A-Z a-z]{1,2}[0-9R][0-9A-Za-z]?[ ]*[0-9][A-Za-z]{2}$/;
					if (!pattern.test(zipcode)) {
						locationError();
					} else {
						// set hidden postcode
						$('#searchForm #searchedPostcode').val(zipcode);
						hasGeoCoded = true;
						if( $("#findYourEvent").length === 0){
							$('#searchForm').submit();
						}
					}
				}
			} else {
				locationError();
			}
		});
	}
	function locationError() {
		$('#searchedLocationSuggestion').hide();
		$("#searchedLocationConflicts").html(" Location not recognised").show();
		$('#searchSpinner').remove();
		setLocationError();
	}

	function setLocationError() {
		$('#searchElement').removeClass('searchBoxNormal');
		$('#searchElement').addClass('searchBoxRed');
		$('#searchedLocationConflicts').addClass('searchErrorMsg');
		/* This is for 2017 theme */
		$('#searchedLocationConflicts').addClass('themeErrorMsg');
		$('#searchedLocationConflicts').show();
		$('#searchElement').focus();
	}

	function clearLocationError() {
		$('#searchElement').removeClass('searchBoxRed');
		$('#searchElement').addClass('searchBoxNormal');
		$('#searchedLocationConflicts').hide();
	}

	function getPostcode(results){
		var zipcode="";
		var pattern = /^[A-Z a-z]{1,2}[0-9R][0-9A-Za-z]?[ ]*[0-9][A-Za-z]{2}$/;
		// Old method, fast but has issues
		zipcode = fastExtractPostcode(results);
		if (pattern.test(zipcode)){
			return zipcode;
		}
		// Slow method, but more accurate
		zipcode = slowExtractPostcode(results);
		if (pattern.test(zipcode)){
			return zipcode;
		}
		// Slowest method, but will obtain anything that's a valid postcode if we've missed it so far.
		zipcode = slowestExtractPostcode(results);
		return zipcode;
	}
	
	function fastExtractPostcode(results){
		var zipcode="";
		for(var i=0; i < results.length; i++){
			if($.inArray("postal_code", results[i].types)>-1){
				for(var j=0;j < results[i].address_components.length; j++){
					for(var k=0; k < results[i].address_components[j].types.length; k++){
						if(results[i].address_components[j].types[k] == "postal_code"){
							zipcode = results[i].address_components[j].long_name;
							if(zipcode!=""){
								return zipcode;
							}
						}
					}
				}
			}
		}
		return zipcode;
	}
	
	function slowExtractPostcode(results){
		// Search the entire result set for "postal_code" and test for something that works.
		var zipcode="";
		var tempZipcode="";
		var pattern = /^[A-Z a-z]{1,2}[0-9R][0-9A-Za-z]?[ ]*[0-9][A-Za-z]{2}$/;
		for (var i=0; i < results.length; i++){
			for (var j=0; j < results[i].address_components.length; j++){
				for (var k=0; k < results[i].address_components[j].types.length; k++){
					if (results[i].address_components[j].types[k] == "postal_code"){
						tempZipcode = results[i].address_components[j].long_name;
						if(pattern.test(tempZipcode)){
							zipcode = tempZipcode;
						}
					}
				}
			}
		}
		return zipcode;
	}
	
	function slowestExtractPostcode(results){
		// Search the entire result set for something that works.
		var zipcode="";
		var tempZipcode="";
		var pattern = /^[A-Z a-z]{1,2}[0-9R][0-9A-Za-z]?[ ]*[0-9][A-Za-z]{2}$/;
		for (var i=0; i < results.length; i++){
			for (var j=0; j < results[i].address_components.length; j++){
				tempZipcode = results[i].address_components[j].long_name;
				if(pattern.test(tempZipcode)){
					zipcode = tempZipcode;
				}
			}
		}
		return zipcode;
	}
	
	
	function getLocality(results){
		var locality="";
		for(var i=0; i < results.length; i++){
			if($.inArray("locality", results[i].types)>-1){
				return extractLocality(results,i);
			}
		}
		if($.trim(locality)==""){
			for(var i=0; i < results.length; i++){
				return extractLocality(results,i);
			}
		}
		return locality;
	}
	
	function extractLocality(results,i){
		var locality="";
		for(var j=0;j < results[i].address_components.length; j++){
			for(var k=0; k < results[i].address_components[j].types.length; k++){
				if(results[i].address_components[j].types[k] == "locality"){
					locality = results[i].address_components[j].long_name;
				}
			}
		}
		// Add county for disambiguation
		for(var j=0;j < results[i].address_components.length; j++){
			for(var k=0; k < results[i].address_components[j].types.length; k++){
				if(results[i].address_components[j].types[k] == "administrative_area_level_2"){
					if(locality!=""){
						locality += ', ';
					}
					locality += results[i].address_components[j].long_name;
				}
			}
		}
		return locality;
	}
	
	// Geolocation.
	// 0. Display icon that geolocation is supported
	// 1. Trigger permission prompt and lookup on mobile page load
	// 2. Upon error, display below field if user has waited patiently
	// 3. Upon success, use immediately if user waited, or prompt to use
	function log(obj) {
		if (window.console != undefined && console.log != undefined) {
			console.log(obj);
		}
	}
		
	function isManualSearchInProgress(newValue) {
		// Avoid bugging the user if they're entering manually
		return $('#searchedLocation').is(":focus") ||
		((($.trim($('#searchedLocation').val())).length > 0) &&
		 $('#searchedLocation').val() != $('#searchedLocation').attr('title') &&
		 $('#searchedLocation').val() !== newValue) ||
		$('#searchedLocation').hasClass('searchInputError') ||
		$('#searchedLocationConflicts').is('.searchErrorMsg:visible');
	}
	
	function geolocationSuccess(position, autopopulate) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng' : new google.maps.LatLng(lat, lng)
		}, function(results, status) {
			$('#searchedLocationGeo button').removeClass('wait');
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var locality = getLocality(results);
					if (locality != '') {
						log("Geolocation: success");
						log(position);
						
						var populateLocation = function() {
							clearLocationError();
							$('#searchedLocationSuggestion').finish().hide();
							// These accurate values get recalculated upon submit -
							// even if we added a field/flag to distinguish them from stale coords,
							// we'd need changes in the controller/session to retain them properly
							//$("#searchedLatitude").val(lat);
							//$("#searchedLongitude").val(lng);
							$("#searchedLocation").val(locality);
							return false; // preventDefault (jQuery will stopPropagation too)
						};
						
						if (autopopulate===true || !isManualSearchInProgress(locality)) {
							populateLocation();
						}
						else {
							clearLocationError();
							if(!$("#searchedLocationSuggestion").length) {
								$("#searchedLocation").after("<div id='searchedLocationSuggestion' class='schemeBorder'/>");
							}
							$('#searchedLocationSuggestion')
							.html("Detected location: ")
							.append($("<a href='#'>"+locality+"</a>").click(populateLocation))
							.finish().show();
						}
					}
					else {
						locationError();
					}
				}
			}
			else {
				locationError();
			}
		});
	}
	
	function geolocationError(err) {
		$('#searchedLocationSuggestion').hide();
		$('#searchedLocationGeo button').removeClass('wait');
		
		if (err.code == err.PERMISSION_DENIED) //== 1
			log("Geolocation: PERMISSION_DENIED");
		if (err.code == err.POSITION_UNAVAILABLE) //== 2
			log("Geolocation: POSITION_UNAVAILABLE");
		if (err.code == err.TIMEOUT) //== 3
			log("Geolocation: TIMEOUT");
		log("Message was: " + err.message);
		
		var message = "Your location could not be determined. Please search by postcode or town/county"
		if (err.code == err.PERMISSION_DENIED) {
			// Changed as part of big walkies events IND-5208
			//message = "Geolocation is disabled - you must enable it to use this feature, or search by postcode or town/county";
			message = "";
		}
		if (!isManualSearchInProgress() && message) {
			$('#searchedLocationConflicts')
				.addClass('searchErrorMsg')
				.html(message)
				.show();
		}
	}
	
	function mobileAndTabletcheck() {
	  return $("html").is(".touchscreen-device");
	}
	
	function tryShowGeolocationIcon(callbackWithPosition, callbackWithError) {
		var geoSupported = (navigator.geolocation != undefined && navigator.geolocation.getCurrentPosition != undefined);
		if(geoSupported) {
			log("Adding geolocation icon");
			var styleLocation = "/webContent/webComponents/googleAddressFinder/css/plugin.google.address.finder.v3.css";
			$.pluginIncludeFileChecker(styleLocation, "link");
			$("<span id='searchedLocationGeo'/>")
			.css({opacity:0,width:0})
			.append($("<button type='button' title='Use my location'/>")
					.click(function(e) {
						$('#searchedLocationGeo button').addClass('wait');
						navigator.geolocation.getCurrentPosition(function(pos) {callbackWithPosition(pos,true);}, callbackWithError, {maximumAge: 75000});
						e.preventDefault();
					}))
			.insertAfter($("#searchedLocation"))
			.animate({opacity:1,width:"30px"});
		}
	}
	
	function tryUseDeviceLocation(callbackWithPosition, callbackWithError) {
		var geoSupported = (navigator.geolocation != undefined && navigator.geolocation.getCurrentPosition != undefined);
		// Mobile-only check TBD with Karen after demo of our location in "London, UK"!
		if(geoSupported) { // && mobileAndTabletcheck()){
			log("Trying to obtain location...");
			navigator.geolocation.getCurrentPosition(function(pos){callbackWithPosition(pos,false);}, callbackWithError, {maximumAge: 75000});
		}
	}

})(jQuery);