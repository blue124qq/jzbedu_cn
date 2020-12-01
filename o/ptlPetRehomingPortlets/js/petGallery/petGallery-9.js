jQuery(function() {
	var $ = jQuery;
	
	$(document).ready(function(){
		
		// Preference mode selector hijinks
		if ($("#petGalleryPortletPrefs").length) {
			$('fieldset').not(".main").hide();
			$('fieldset.' + $('#mode').val()).show();
			$('#mode').change(function(){
				// Hide any fieldset that isn't main
				$('fieldset').not(".main").hide();
				// Unhide the set for the mode we've got
				var mode = $(this).val();
				$('fieldset.' + mode).show();
			});
		}
		
		if ($("#petGalleryPortlet").length){
			// Setup
			var sliderLocation = "/webContent/webComponents/flexslider/js/flexslider.js";
			var sliderCSSLocation = "/webContent/webComponents/flexslider/css/flexslider.css";
			//var fontAwesomeLocation = "/webContent/webComponents/fontAwesome/css/font-awesome.css";
			var fontAwesomeLocation = "//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css";
			//$.pluginIncludeFileChecker(sliderLocation, "script");
			$.pluginIncludeFileChecker(sliderCSSLocation, "link");
			$.pluginIncludeFileChecker(fontAwesomeLocation, "link");
		}
	});
	
	$( window ).resize(function() {
		loadGallery();		
	});


	$(window).on('load',function() {
		loadGallery();		
	});
	
	
	function loadGallery() {
		if ($("#petGalleryPortlet").length){
			$(".hiddenForLoading").removeClass("hiddenForLoading");
			
			var displayNum = 0;
			var portletWidth = $("#petGalleryPortlet").width();
			var galleryWidth = $("#galleryContainer").width();
			var slides = $("#petGalleryPortlet li.slide").length;
			
			if ((window.innerWidth || ($(window).width() + 15)) >= 1007){
				//desktop
				//full width - show 4 images
				if(portletWidth == 990){
					displayNum = 4;					
										
				}else{
						if(portletWidth >= 238){
						//3/4 width
						displayNum = 3;
						}
						
						else{
							// 1/4 width
							displayNum = 1;
						}
				}				
			}else{
				if ((window.innerWidth || ($(window).width() + 15)) >= 768){
					//tablet
					//some of the layouts have areas that are less than 485px when that happens show 1 image
					if(portletWidth >= 486){
						displayNum = 2;
					}
					else{						
						displayNum = 1;
					}
				}else{
					displayNum = 1;
				}
				
			}
		
						
			if(displayNum == 1 || displayNum == 2){
				$("#petGalleryPortlet").css("margin-top", "10px");
			}
			
			
			displayNum = Math.min(displayNum, slides);			
			var itemWidth = (galleryWidth / displayNum);
						
			
			switch(displayNum) {
		    case 4:
				//aligning 1st element flush to the left, last element flush to the right and equal spacing on the remaining images
				$("li.slide:nth-child(4n+1) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
				$("li.slide:nth-child(4n+2) .entryContainer .imageContainer").css({"margin-right": "10px","margin-left": "auto"});
				$("li.slide:nth-child(4n+3) .entryContainer .imageContainer").css({"margin-left": "10px","margin-right": "auto"});
				$("li.slide:nth-child(4n+4) .entryContainer .imageContainer").css({"margin-right": "0px","margin-left": "auto"});	
				
				$( ".flex-prev" ).click(function() {
					//console.log("reposition slides when prev button clicked");
					$("li.slide:nth-child(4n+1) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
					$("li.slide:nth-child(4n+2) .entryContainer .imageContainer").css({"margin-right": "10px","margin-left": "auto"});
					$("li.slide:nth-child(4n+3) .entryContainer .imageContainer").css({"margin-left": "10px","margin-right": "auto"});
					$("li.slide:nth-child(4n+4) .entryContainer .imageContainer").css({"margin-right": "0px","margin-left": "auto"});	
				})
		        break;
		    case 3:

				//aligning 1st element flush to the left, last element flush to the right and equal spacing on the remaining images
				$("li.slide:nth-child(3n+1) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
				$("li.slide:nth-child(3n+2) .entryContainer .imageContainer").css({"margin-right": "auto","margin-left": "auto"});
				$("li.slide:nth-child(3n+3) .entryContainer .imageContainer").css({"margin-right": "0px","margin-left": "auto"});
				
				$( ".flex-prev" ).click(function() {
					//console.log("reposition slides when prev button clicked");
					$("li.slide:nth-child(3n+1) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
					$("li.slide:nth-child(3n+2) .entryContainer .imageContainer").css({"margin-right": "auto","margin-left": "auto"});
					$("li.slide:nth-child(3n+3) .entryContainer .imageContainer").css({"margin-right": "0px","margin-left": "auto"});	
				})
		    default:
		        break;
		    
			}
			

			
			
			// Build the slider
			if (displayNum >= slides){
				// No control elements if there's not enough images to need scrolling
				$('#petGalleryPortlet .flexslider').flexslider({
					animation : "slide",
					controlNav: false,
					animationLoop: false,
					end: function(){
						//console.log("End call back function");
						if(displayNum == 4 && !((slides % 4) == 0)){
							//console.log("repositioing last slides");
							//aligning 1st element flush to the left, last element flush to the right and equal spacing on the remaining images
							$("li.slide:nth-last-child(4) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
							$("li.slide:nth-last-child(3) .entryContainer .imageContainer").css({"margin-right": "10px","margin-left": "auto"});
							$("li.slide:nth-last-child(2) .entryContainer .imageContainer").css({"margin-left": "10px","margin-right": "auto"});
							$("li.slide:nth-last-child(1) .entryContainer .imageContainer").css({"margin-right":"0px","margin-left": "auto"});							
						}
						if(displayNum == 3 && !((slides % 3) == 0)){
							//console.log("repositioing last slides");
							//aligning 1st element flush to the left, last element flush to the right and equal spacing on the remaining images
							$("li.slide:nth-last-child(3) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
							$("li.slide:nth-last-child(2) .entryContainer .imageContainer").css({"margin-right": "auto","margin-left": "auto"});
							$("li.slide:nth-last-child(1) .entryContainer .imageContainer").css({"margin-right":"0px","margin-left": "auto"});							
						}
					},
					slideshow: false,
					directionNav: false,
					itemWidth:itemWidth,
					maxItems: displayNum,
					before: function(){
						$(window).trigger('resize');
					}
				});
			} else {
				$('#petGalleryPortlet .flexslider').flexslider({
					animation : "slide",
					controlNav: false,
					animationLoop: false,
					end: function(){
						//console.log("End call back function");
						if(displayNum == 4 && !((slides % 4) == 0)){
							//console.log("repositioing last slides");
							//console.log("4 slides visible");
							//aligning 1st element flush to the left, last element flush to the right and equal spacing on the remaining images
							$("li.slide:nth-last-child(4) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
							$("li.slide:nth-last-child(3) .entryContainer .imageContainer").css({"margin-right": "10px","margin-left": "auto"});
							$("li.slide:nth-last-child(2) .entryContainer .imageContainer").css({"margin-left": "10px","margin-right": "auto"});
							$("li.slide:nth-last-child(1) .entryContainer .imageContainer").css({"margin-right":"0px","margin-left": "auto"});							
						}
						if(displayNum == 3 && !((slides % 3) == 0)){
							//console.log("repositioing last slides");
							//console.log("3 slides visible");
							//aligning 1st element flush to the left, last element flush to the right and equal spacing on the remaining images
							$("li.slide:nth-last-child(3) .entryContainer .imageContainer").css({"margin-left": "0px","margin-right": "auto"});
							$("li.slide:nth-last-child(2) .entryContainer .imageContainer").css({"margin-right": "auto","margin-left": "auto"});
							$("li.slide:nth-last-child(1) .entryContainer .imageContainer").css({"margin-right":"0px","margin-left": "auto"});							
						}
					},
					slideshow: false,
					directionNav: true,
					prevText: '<i class="fa fa-angle-left schemeBackgroundDk themeBackgroundLadybird"/>',
					nextText: '<i class="fa fa-angle-right schemeBackgroundDk themeBackgroundLadybird"/>',
					itemWidth:itemWidth,
					maxItems: displayNum,
					before: function(){
						$(window).trigger('resize');
					}
				});
			}
		};
		
	};
});