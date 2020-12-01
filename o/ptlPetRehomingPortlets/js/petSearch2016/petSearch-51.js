jQuery(function() {
	var $ = jQuery;
	$(document).ready(function(){
		
		var jpagesLocation = "/webContent/webComponents/jPages/js/jPages.min.js";
		$.pluginIncludeFileChecker(jpagesLocation, "script");
		var $initialPageDiv = $('#initialPage');
		var initialPage = 1;
		var newSearch = "true";
		if($initialPageDiv.length > 0 && !isNaN(parseInt($initialPageDiv.text()))) {
			initialPage = parseInt($initialPageDiv.text());
		}
				
		// these vars are to prevent duplication or corruption of event tracking when functions chain
		// there is probably a better way to do it
		temporarilyPreventChangesToEventVars = false;
		temporarilyPreventEventTracking = false;

		var isMobile = false;
		var isTablet = false;
				
		//This function uses a css class that is only applied between 855 and 696 there for is for tablet only
		function checkSize(){
		    if ($("#wrapper form#searchForm:not(#preferenceCommand)").css("padding-bottom") == "15px" ){
		       isTablet = true;
		    }else{
			   isTablet = false;		    	
		    }
		}
		
		if( $("#petSearchResults li").length){
			// If results, show bar, else hide
			$("hr").removeClass("hidden");
		}
		
		if( $("#bottomButtons").is(":visible") ){
			isMobile=true;
			if(($("#wrapper form#searchForm:not(#preferenceCommand)").css("padding-bottom") !== "15px" )){
				if($("#petSearchResults").length >0){
					$("#petSearchFields").addClass("hidden");
					$("#blurb").addClass("hidden");
					$("#addressSearchGoButton").addClass("hidden");
					$("#topRightSearch").removeClass("hidden");
					$("#topRightSearchHolder").removeClass("hidden");
				} else {
					$(".moreResults").addClass("hidden");
					$(".backButton").addClass("hidden");
				}
				checkSize();
			}
		}
		

		$.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return results[1] || 0;
		    }
		}
		
		if(!isMobile){
			if ($("div#petSearchResultsNav")){
				$("div#petSearchResultsNav").jPages({
				      containerID : "petSearchResults",
				      pause       : 0,
				      previous    : "span.jpageArrowPrev",
				      next        : "span.jpageArrowNext",			      
				      first       : false,
				      last        : false,
				      perPage	  : 12,
				      midRange    : 3,
				      clickStop   : true,
				      minHeight	  : false,
				      startPage   : initialPage,
				      callback    : function(pages, items) {
										document.location = '#onSubmitSetHere';
										var pageNum = pages.current;
										var uBound = pageNum*12;
										var lBound = uBound-12;
										var counter = 1;
										$("#petSearchResults .petSearchImg").each( function(){
											if(counter > uBound){
												return false;
											}
											if(counter > lBound && counter <= uBound ){
												var imageSrc = $(this).siblings(".imagePlace").text();
												$(this).attr("src", imageSrc);
											}
											counter++;
										});
										
									}
				});
			}
		} else {
			$(".jpage-navigation").addClass("hidden");
			var indexToShow = ((initialPage -1) * 12) + 11; 
			$("#petSearchResults li").each(function(index){
				if(index > indexToShow){
					$(this).addClass("hidden");
				} else if (index >11) {
					var image = $(this).find(".petSearchImg"); 
					if( image.attr("src") === ""){
						var imageSrc = image.siblings(".imagePlace").text();
						image.attr("src", imageSrc);
					}
				}				
			});
			
			
			if( $("#petSearchResults li").length < 13 ){
				$(".moreResults").addClass("hidden");
				$(".backButton").addClass("hidden");
			}
		}
		

		// firefox fix
		if($(".jp-current").length != 0) {
			document.location = "#onSubmitSetHere";
		}

		if($('#petSearchResults li').length > 0){
			/* ...Hide branch content if we have animals */
			$('.estab-content-display').addClass("desktop-and-above");
		}else{
			$('.siteManagerImage').addClass("tablet-and-above");
		}
		
		if($('#petSearchResults').length === 0){
			$(".backButton").addClass("hidden");
		}
		
		function isMobileDisplay(){
			var isMobile = false;
			if( $("#bottomButtons").is(":visible") ){
				isMobile=true;
			}
			return isMobile;
		}

		function isTablet(){
		    if ($("#wrapper form#searchForm:not(#preferenceCommand)").css("padding-bottom") == "15px" ){
		       return true;
		    }else{
			   return false;		    	
		    }
		}
		
		function clearTheFilters() {
			if(isFiltered()){
				clearFiltersNoReload();
				if(temporarilyPreventChangesToEventVars == false) {
					try {
						 sendEvent( "Pet Search Filter", "Clear Filters", null );
					} catch(e) {
					}
				}
				temporarilyPreventEventTracking = true;
				temporarilyPreventChangesToEventVars = true;
				newSearch = "false";
				$('#noPageView').val("true");
				$("#addressSearchGoButton").click();
			}
		}

		function hideErrors() {
			var $searchedLocation = $('#searchedLocation');
			$searchedLocation.parent().removeClass('searchBoxRed');
			$searchedLocation.removeClass('searchInputError');
			var $searchedLocationConflicts = $('#searchedLocationConflicts');
			$searchedLocationConflicts.removeClass('searchErrorMsg');
			$searchedLocationConflicts.hide();
			$searchedLocationConflicts.html("");
			$searchedLocationConflicts.hide()
			var $animalTypeConflicts = $('#animalTypeConflicts')
			$animalTypeConflicts.removeClass('searchErrorMsg');
		    $animalTypeConflicts.html("");
		    $animalTypeConflicts.hide();
		}

		function hideResults() {
			$('.jpage-navigation').hide();
			$('#petSearchResults').hide();
			$('#petSearchFilters').hide();
			$('#yourFilters').hide();
			$('#petRehomingPortlet > h4').hide();
			$('.petSearchFilter').hide();
			$('.petSearchFilterControl').hide();
			$(".petSearchNoAnimals").hide();
			$("#refineSearch").hide();
			$("#specialAppealsGoButton").hide();
			$("#specialAppealsOR").hide();
			$("#returnToSearchButton").hide();
			$("div .subscribe").hide();
		}

		function filterInactive(val) {
			return (val == undefined) || (val == "");
		}

		function isFiltered() {
			var filtered = false;
			filtered = filtered || !filterInactive($("#PS-animalSubType").val())
			filtered = filtered || !filterInactive($("#PS-otherAnimalType").val())
			filtered = filtered || !filterInactive($("#PS-ageRange").val());
			filtered = filtered || !filterInactive($("#PS-gender").val());
			filtered = filtered || !filterInactive($("#PS-size").val());
			return filtered;
		}

		$('.petSearchFilter select').change(function() {
			$("#showFiltersAnyway").val("true");
			trackEventCategory = "Pet Search Filter";
			trackEventAction = $(this).find("option:eq(0)").text();//default text of drop down
			trackEventLabel = $(this).find("option:selected").val();
			if(temporarilyPreventChangesToEventVars == false) {
					try {
						 sendEvent( trackEventCategory,trackEventAction, trackEventLabel );
					} catch(e) {
					}
				}
			temporarilyPreventEventTracking = true;
			temporarilyPreventChangesToEventVars = true;
			newSearch = "false";
			$('#noPageView').val("true");
	        $("#addressSearchGoButton").click();

	    });

		$('#clearFilters').click(function() {
			$("#showFiltersAnyway").val("true");
			clearTheFilters();
		});
		
		$("#sortDistance").click(function(event) {
			event.preventDefault();
			event.stopPropagation();
			$("#arrivalSort").val("false");
			$("#sortDistance").hide();
			$("#sortArrival").show();
			$("#addressSearchGoButton").click();
		});
		
		$("#sortArrival").click(function(event) {
			event.preventDefault();
			event.stopPropagation();
			$("#arrivalSort").val("true");
			$("#sortArrival").hide();
			$("#sortDistance").show();
			$("#addressSearchGoButton").click();
		});

		$('#PSanimalType').change(function() {
			if($("#isEstablishment").length > 0){
				clearFiltersNoReload();
				hideResults();
				trackEventCategory = "In Your Area Pet Search";
				trackEventAction = $('#PSanimalType').val();
				trackEventLabel = $('#PSestablishmentName').val();
				newSearch = true;
				$('#clearYourFilters').hide();
				$('#moreFilters').hide();
				$('#lessFilters').hide();
				$('#bottomButtons .moreResults').hide();
				$('#bottomButtons .backButton').hide();
				$("#searchForm").submit();
			} else {
				if(checkType($('#PSanimalType')) && checkLocationSilent($('#searchedLocation'))){
					trackEventCategory = "Pet Search";
					trackEventAction = $('#searchForm #PSanimalType').val();
					trackEventLabel = "N/A";
					temporarilyPreventChangesToEventVars = true;
					clearTheFilters();
					$("#showFiltersAnyway").val("false");
					$("#freshSearch").val("true");
					$('#clearYourFilters').hide();
					$('#moreFilters').hide();
					$('#lessFilters').hide();
					$('#bottomButtons .moreResults').hide();
					$('#bottomButtons .backButton').hide();
					newSearch = true;
			        $("#addressSearchGoButton").click();
				}
			}
	    });
		
		$('#refineSearch').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			if($("#filterContainer").hasClass("hidden")){
				$("#filterContainer").removeClass("hidden");
				$("#moreFilters").addClass("hidden");
				$("#lessFilters").addClass("hidden");
				$("#clearFilters").addClass("hidden");
				$("#specialAppealsGoButton").addClass("hidden");
				$("#specialAppealsOR").addClass("hidden");
			} else {
				clearUpFilters();
				$("#clearFilters").removeClass("hidden");
				$("#filterContainer").addClass("hidden");
				if($("#moreFilters").hasClass("required") && $("#moreFilters").hasClass("hidden")){
					$("#moreFilters").removeClass("hidden");
				}
				if($("#lessFilters").hasClass("required") && $("#lessFilters").hasClass("hidden")){
					$("#lessFilters").removeClass("hidden");
				}
				if(!$("#petRehomingPortlet input:checkbox:checked").length){
					$("#specialAppealsGoButton").removeClass("hidden");
					$("#specialAppealsOR").removeClass("hidden");
				}
			}
			if($("#yourFilters").hasClass("hidden")){
				$("#yourFilters").removeClass("hidden");				
			}else{
				$("#yourFilters").addClass("hidden");
			}
		});
		
		$('#closeYourFilters').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$('#refineSearch').click();
		});
		
		$('.deleteFilter').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			var name = $(this).attr("href");
			var filter = $(this).parent().attr("name");
			var selector = "#" + filter + "_" + name;
			$(selector).prop("checked", false);
			$(this).parent().remove();
			$('#moreFilters').hide();
			$('#lessFilters').hide();
			$('#clearYourFilters').hide();
			newSearch = "false";
			$('#noPageView').val("true");
			$("#addressSearchGoButton").click();
		}); 
		
		$('#petRehomingPortlet .more').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			var myId = $(this).attr("id");
			var type = myId.replace("more", "");
			var liSelector = "#" + type + "filters li";
			var lessSelector = "#" + "less" + type;
			$(this).addClass("hidden");
			$(liSelector).removeClass("hidden");
			$(lessSelector).removeClass("hidden");
		}); 
		
		$('#petRehomingPortlet .less').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			var myId = $(this).attr("id");
			var type = myId.replace("less", "");
			var liSelector = "#" + type + "filters li";
			var moreSelector = "#" + "more" + type;
			$(this).addClass("hidden");
			$(liSelector).each(function(index){
				if(index > 4){
					$(this).addClass("hidden");
				}
			});
			$(moreSelector).removeClass("hidden");
			$('html, body').animate({
				'scrollTop':   $('#mainHeading').offset().top
		    }, 300);
		});
		
		$('.clear').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			var parentFilter = $(this).closest(".filterType");
			$(parentFilter).find("li input[type='checkbox']").attr('checked', false);
		}); 

		$('#applyFilters').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$('#moreFilters').hide();
			$('#lessFilters').hide();
			$('#bottomButtons .moreResults').hide();
			$('#bottomButtons .backButton').hide();
			
			/*Google tracking for selected filters*/
			/* set up the EventCategory and eventLable*/
			var eventCategory = "";
			var filtersList = "";
             
			/*Loop through all check boxes*/
			$("input:checkbox").each(function(){
			    var $this = $(this);
                
			    /* if they are checked build a tracking tag*/
			    if($this.is(":checked")){
			        values=$this.attr("id").split('_');
			        var newCat=values[0];
                    
			        /* spaces required in different filters so use the label after taking off the figure in brackets*/
				    if($this.is(":checked")){
				        var info= $('label[for="' + $this.attr("id") + '"]').text();
				        values=info.split('('); 
				        info=values[0];
			     
			             
				        if(eventCategory !=newCat){
				          if(eventCategory != ""){
				        	  /* only fire the tracking tag once the filters have all been captured then build the next tag*/
				        	  try{
				        		  sendEvent("Pet Search Filter", "- Select "+eventCategory+" -", filtersList);
				        	  }  catch(e) {
				        	  }
				          	}
				            eventCategory = newCat;
				            filtersList = info;
				        }else{
				            filtersList = filtersList + ", " + info;          
				        }
			      
				    }
			    }
			});
      	  
			
			$('#filterContainer').hide();
			/*For mobile and Tablet scroll to the top*/
			if(isMobileDisplay()){
				$('html, body').animate({'scrollTop':   ($('#petRehomingPortlet').offset().top - 150)}, 300);
			}
			newSearch = "false";	
			$('#noPageView').val("true");
			$("#addressSearchGoButton").click();
		});
		
		$('.clearFilters').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$("#filters li input[type='checkbox']").attr('checked', false);
			if(temporarilyPreventChangesToEventVars == false) {
				try {
					 sendEvent( "Pet Search Filter", "Clear Filters", null );
				} catch(e) {
				}
			}	
			$('#moreFilters').hide();
			$('#lessFilters').hide();
			$('#clearYourFilters').hide();		
			$('.schemeButton.moreResults').hide();
			$('#bottomButtons .backButton').hide();
			if(isMobileDisplay()){
				$('html, body').animate({'scrollTop':   ($('#petRehomingPortlet').offset().top - 150)}, 300);
			}
			newSearch = "false";	
			$('#noPageView').val("true");
			$("#addressSearchGoButton").click();			
		});

		$('#topRightSearch').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$("#filters li input[type='checkbox']").attr('checked', false);
			$(".petSearchNoAnimals").addClass("hidden");
			$(".petSearchFilters").addClass("hidden");
			$("#petSearchResults").addClass("hidden");
			$("#bottomButtons").addClass("hidden");
			$(this).addClass("hidden");
			$("#topRightSearchHolder").addClass("hidden");
			$("#petSearchFields").removeClass("hidden");
			$("#blurb").removeClass("hidden");
			newSearch = "false";			
			$("#addressSearchGoButton").removeClass("hidden");
		});
				
		$('#moreFilters').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).addClass("hidden");
			$(this).removeClass("required");
			$("#lessFilters").removeClass("hidden");
			$("#lessFilters").addClass("required");
			var isMobile = false;
			if( $("#bottomButtons").is(":visible") ){
				isMobile=true;
			}
		});
		
		$('#lessFilters').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).addClass("hidden");
			$(this).removeClass("required");
			$("#moreFilters").removeClass("hidden");
			$("#moreFilters").addClass("required");
			var isMobile = false;
			if( $("#bottomButtons").is(":visible") ){
				isMobile=true;
			}
			
			$('html, body').animate({'scrollTop':   ($('#petRehomingPortlet').offset().top - 150)}, 300);
		});
		
		$('.moreResults').click(function(event){
			event.preventDefault();
			event.stopPropagation();
			$("#petSearchResults li:hidden").each(function(index){
				if(index < 12){
					var imageSrc = $(this).find(".imagePlace").text();
					$(this).find(".petSearchImg").attr("src", imageSrc);
					$(this).removeClass("hidden");
				}
			});
			if( $("#petSearchResults li:hidden").length === 0 ){
				$('.moreResults').addClass("hidden");
				$('#bottomButtons a.backButton').addClass("onOwn");				
			}
		}); 


		$('#searchForm').submit(function(e){
			$('.waiter').remove();
			var formValid = formWasValid();
			if(formValid){
                if(	newSearch != "false"){
					if(temporarilyPreventEventTracking == false) {
						try {
							sendEvent( trackEventCategory, trackEventAction, trackEventLabel );
						} catch(e) {
						}
					}
                }
				$('<p class="waiter">Searching, please wait...</p>').insertAfter("#addressSearchGoButton");
			}else {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
			temporarilyPreventEventTracking = false;
			return formValid;
		});

		function formWasValid() {
			if($("#isEstablishment").length != 0){
				return true;
			}
			return (checkForm() && !($('#searchForm #searchedLocation').hasClass("searchInputError") || $('#searchForm #searchElement').hasClass("searchBoxRed")));
		}

		function checkForm() {
			if($("#isEstablishment").length != 0){
				return true;
			}
			var allOk = checkLocation($('#searchedLocation'));
			allOk = checkType($('#PSanimalType')) && allOk;
			return allOk;
	    }

		$('#searchedLocation').keydown(function(event){
		    if(event.keyCode == 13){
				$("#showFiltersAnyway").val("false");
				newSearch = "true";
		        $("#addressSearchGoButton").click();
		        return false;
		    }
		});

		$('#specialAppealsGoButton').click(function(){
			hideResults();
		});
		
		
		$('#returnToSearchButton').click(function(){
			hideResults();
		});
		
		$('#addressSearchGoButton').click(function() {
			hideErrors();
			hideResults();
			$('#moreFilters').hide();
			$('#lessFilters').hide();
			$('#clearYourFilters').hide();
			if(newSearch != "false"){
				if(temporarilyPreventChangesToEventVars == false) {
					if($('#isEstablishment').length > 0) {
						trackEventCategory = "In Your Area Pet Search";
						trackEventAction = $('#PSanimalType').val();
						trackEventLabel = $('#PSestablishmentName').val();
					} else {
						trackEventCategory = "Pet Search";
						trackEventAction = $('#searchForm #PSanimalType').val();
						trackEventLabel = "N/A";
					}
				}
			}
			temporarilyPreventChangesToEventVars = false;
			return checkForm();
		});

		$('#addressSearchGoButton').keydown(function(event){
		    if(event.keyCode == 13){
				$("#showFiltersAnyway").val("false");
				temporarilyPreventChangesToEventVars = false;
				newSearch = "true";			
		        $("#addressSearchGoButton").click();
			    return false;
		    }
		});

		$('#petSearchResults li a').click(function() {
			// save the current page to a cookie for the back link
			if( $(".jpage-navigation").is(":visible") ){
				createCookie('petSearchListingPageNoCookie', $('.jp-current').html(), '1');
			} else {
				createCookie('petSearchListingPageNoCookie', Math.ceil( $("#petSearchResults li:visible").length / 12 )  , '1');
			}
		});

		// Track page navigation
		$('#petSearchResultsNav a').on('click', function(event) {
			var $clickedButton = $(this);
			if($clickedButton.hasClass("jp-disabled")) {
				return;
			}
			
			if($('#onSubmitSetHere').size() == 0){
				$( '<a id="onSubmitSetHere"></a>' ).insertBefore($( "#searchForm"));
				document.location = "#onSubmitSetHere";
			}


			var currentPageNoString = $("#petSearchResultsNav .jp-current").html();
			var currentPageNo = parseInt(currentPageNoString);

			var buttonType;
			var destinationPageNo;

			if($clickedButton.hasClass("jp-next")) {
				buttonType = "next";
				destinationPageNo = currentPageNo + 1;
			} else if($clickedButton.hasClass("jp-previous")) {
				buttonType = "prev";
				destinationPageNo = currentPageNo - 1;
			} else {
				buttonType = "number";
				destinationPageNo = parseInt(currentPageNo);
			}

			// the old petsearch doesn't use the destination page number for some reason, so I won't change things
			try {
				sendEvent( "Petsearch results page", buttonType, currentPageNoString, currentPageNo );
			} catch (e) {
			}

		});

		function checkType(that) {
			var typeVal = that.val();
			if( typeVal.length>0 ){
				that.removeClass('selectBorderRed');
				$('#animalTypeConflicts').removeClass('searchErrorMsg');
				$('#animalTypeConflicts').hide();
				$('#animalTypeConflicts').html("");
				return true;
			} else {
				that.addClass('selectBorderRed');
				$('#animalTypeConflicts').addClass('searchErrorMsg');
				$('#animalTypeConflicts').html("You must select a type");
				$('#animalTypeConflicts').show();
				$('#moreFilters').hide();
				$('#lessFilters').hide();
				$('#clearYourFilters').hide();

				hideResults();
				return false;
			}
		}


		function checkLocation(that) {
			var locationVal = that.val();
			//alert("checking location: " + locationVal);
			if( (locationVal.length >0 && locationVal !== "Enter postcode or town/county") ){
				$('#searchedLocation').removeClass('searchInputError');
				$('#searchedLocationConflicts').removeClass('searchErrorMsg');
				$('#searchedLocationConflicts').hide();
				$('#searchedLocationConflicts').html("");
				return true;
			}else{
				$('#searchedLocation').addClass('searchInputError');
				$('#searchedLocationConflicts').addClass('searchErrorMsg');
				$('#searchedLocationConflicts').html("Enter a postcode or town/county");
				$('#searchedLocationConflicts').show();
				$('#moreFilters').hide();
				$('#lessFilters').hide();
				$('#clearYourFilters').hide();
				$('#bottomButtons .moreResults').hide();
				$('#bottomButtons .backButton').hide();
				return false;
			}
		}

		function checkLocationSilent(that) {
			var locationVal = that.val();
			if( (locationVal.length >0 && locationVal !== "Enter postcode or town/county") ){
				return true;
			}else{
				return false;
			}
		}

		function clearFiltersNoReload() {
			// Is this still being used?
			// 
			$("#PS-animalSubType").val("");
			$("#PS-otherAnimalType").val("");
			$("#PS-ageRange").val("");
			$("#PS-gender").val("");
			$("#PS-size").val("");
	    }

		function createCookie(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		}


		// autoSubmit the form if the autoSubmitDiv is present
		if($('#automaticallySubmitPetSearchForm').length != 0){
			$('#addressSearchGoButton').click();
		}

		// when the window is unloaded, we need to remove the spinners and show the animals
		// this means even if the browser caches the page, the animal they clicked on will be back in the list
		$(window).bind("pageshow", function(event) {
		    $('.waiter').remove();
			$('#petSearchResults li .holder').show();
			$('.chosenAnimal').remove();
		});
		
		window.mobilecheck = function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
		
		window.mobileAndTabletcheck = function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			 return check;
		}
		
		function clearUpFilters(){
			// Clean non-applied filters
			
			// Restore unchecked filters
			$('#filters input:checkbox:checked').prop('checked', false);
			// If a checkbox has a class "activeFilter", it was initially checked
			$('#filters input:checkbox.activeFilter').prop('checked', true);
		}
		
		$( "#favouritesLink a").click(function() {
			try {
				sendEvent( "Pet search favourites", "View all", $("#PSanimalType").find(":selected").val());
			} catch(e){
			}
		});
	});

	$(window).on('load',function(){
		
		function isMobileDisplay(){
			var isMobile = false;
			if( $("#bottomButtons").is(":visible") ){
				isMobile=true;
			}
			return isMobile;
		}
		
		if(isMobileDisplay()){
			$( "#petSearchResults li" ).addClass( "schemeBackgroundDk" );
			$( "#petSearchResults li" ).addClass( "themeBackgroundLadybird" ).removeClass( "themeBackgroundMouse" );
			//Scroll for when user comes back from results page
			var scrollToId = $.urlParam('animalIdMarker');
			if (!(scrollToId==null)&& scrollToId.trim().length>0) {
				scrollToId = "#" + scrollToId;						
				$('html, body').animate({'scrollTop':   ($(scrollToId).offset().top - 100)}, 300);
			}
		}else{
			$( "#petSearchResults li" ).removeClass("schemeBackgroundDk");
			$( "#petSearchResults li" ).removeClass("themeBackgroundLadybird").addClass("themeBackgroundMouse");
			$( "#petSearchResults li" ).hover(
				function(){
					$( this ).addClass( "schemeBackgroundDk" );				
					$( this ).addClass( "themeBackgroundLadybird" ).removeClass( "themeBackgroundMouse" );				
				}, function(){
					$( this ).removeClass( "schemeBackgroundDk" );
					$( this ).addClass( "themeBackgroundMouse" ).removeClass( "themeBackgroundLadybird" );				
				}	
			);
		}
	});
	
	
});
