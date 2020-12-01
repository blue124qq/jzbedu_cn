jQuery(function() {
	var $ = jQuery;
	$(document).ready(function() {
		
		// Flyout Menus
		function flyoutOnItem(item){
			$("#site-nav-container-level-1").children(".nav-level-1").hide();
			$("#site-nav-container-level-2").children(".nav-level-2").hide();
			var index = $(item).parent().parent().data("id");
			$(".nav-highlighted").removeClass("nav-highlighted");
			$(item).parent().parent().siblings(".nav-nochild-highlighted").removeClass("nav-nochild-highlighted");
			if ($(".nav-level-1 li[data-parent-id=" + index + "]").length) {
				$(".nav-level-1 li[data-parent-id=" + index + "]").parent().show();
				$(item).parent().parent().addClass("nav-highlighted");
				$("#site-nav-container-level-1").show();
			} else {
					$("#site-nav-container-level-1").hide();
					$(item).parent().parent().addClass("nav-nochild-highlighted"); 
			}
		}
		
		function closeFlyouts(){
			$(".nav-level-1").hide();
			$(".nav-level-2").hide();
			$("#site-nav-container-level-1").hide();
			$("#site-nav-container-level-2").hide();
			$(".nav-highlighted").removeClass("nav-highlighted");
			$(".nav-temp-hold").removeClass("nav-temp-hold");
			$(".nav-nochild-highlighted").removeClass("nav-nochild-highlighted");
			$(".hiddenSelected").removeClass("hiddenSelected").addClass("selected");
		}
		
		// Handle sticky menu
		flyoutOnItem(".nav-level-0 .selected a");
		if ($("#site-nav-container-level-1").is(":visible")){
			$("#site-nav-container-level-1").addClass("nav-selected-sticky-flyout");
		}
		
		// Change flyout on mouse over
		$(".nav-level-0 li a").mouseover(function() {
			$(".nav-temp-hold").removeClass("nav-temp-hold");
			$(this).addClass("nav-temp-hold");
			flyoutOnItem(".nav-temp-hold");
		});

		// Handle second level flyout, bit more complicated
		$(".nav-level-1 li a").mouseover(function() {
			// Index of flyout is the index of this li container
			$("#site-nav-container-level-2").children(".nav-level-2").hide();
			var index = $(this).parent().parent().data("id");
			var position = $(this).parent().parent().parent().parent().position();
			$(this).parent().parent().siblings(".nav-highlighted").removeClass("nav-highlighted");
			$(this).parent().parent().siblings(".nav-nochild-highlighted").removeClass("nav-nochild-highlighted");
			if ($(".nav-level-2 li[data-parent-id=" + index + "]").length) {
				$("#site-nav-container-level-2").show();
				$("#site-nav-container-level-2").css('top', position.top + $("#site-nav-container-level-1").height() + 'px');
				$(".nav-level-2 li[data-parent-id=" + index + "]").parent().show();
				$(this).parent().parent().addClass("nav-highlighted");
				// Handle second level selected
				if ($(this).parent().parent().hasClass("selected")){
					$(this).parent().parent().removeClass("selected").addClass("hiddenSelected");
				} else {
					$(".hiddenSelected").removeClass("hiddenSelected").addClass("selected");
				}
			} else {
				$("#site-nav-container-level-2").hide();
				$(this).parent().parent().addClass("nav-nochild-highlighted");
			}
		});

		// Handle cleanup
		$("#site-navigation").mouseleave(function() {
			closeFlyouts();
			$("#site-navigation .selected_menu").show();
			flyoutOnItem(".nav-level-0 .selected a");
		});
		
		
		/////////////////////////////////////////////////////////////////////////////
		// Pop-out menus
		function closePopouts(item){
			$(item).parents(".nav-list-parent").find(".nav-list-child").hide();
			$(item).parents(".nav-list-parent").find(".open").removeClass("open");
		}
		$("#wrapper img.nav-button").click(function() {
			if ($(this).hasClass("nav-open")){
				closePopouts(this); // Close everything else
				$(this).parent().siblings(".nav-list-child").show();
				$(this).parent().addClass("open");
			} else {
				closePopouts(this);
			}
		});
		
		// Handle showing mobile child menu
		$("#wrapper img#mobile-child-navigation-menu").click(function(){
			if ($(this).hasClass("nav-open")){
				$(this).attr("src","/webContent/webComponents/images/rspca_navigation/down-chevron-large.png");
				$(this).attr("alt","RSPCA site navigation");
				$(this).removeClass("nav-open");
				$("#mobile-child-navigation-menu-holder").removeClass("themeBackgroundKingfisher");
			} else {
				$(this).addClass("nav-open");
				$(this).attr("src","/webContent/webComponents/images/rspca_navigation/nav-close.png");
				$(this).attr("alt","Close RSPCA site navigation");
				$("#mobile-child-navigation-menu-holder").addClass("themeBackgroundKingfisher");			
			}
			
			$("#mobile-child-navigation-menu-holder").height($("#navigation-breadcrumb").outerHeight()+"px");			
			$(this).parent().siblings("#mobile-child-navigation").toggle();
		});
		
		// Handle mobile navigation
		$("#wrapper img.menu-icon").click(function() {
			if ($(this).hasClass("nav-open")){
				$(this).attr("src","/webContent/webComponents/images/rspca_navigation/mobile-menu.png");
				$(this).attr("alt","RSPCA site navigation");
				$(this).removeClass("nav-open");
			} else {
				$(this).addClass("nav-open");
				$(this).attr("src","/webContent/webComponents/images/rspca_navigation/nav-close.png");
				$(this).attr("alt","Close RSPCA site navigation");
			}
			$("#heading #header-nav-menu").toggle();
			$("#heading .headerButtons").toggle();
			// Hide or show the seperator lines
			$("#mobile-nav-menu .headerSeparator").toggle();
			$("#heading hr").toggle();
		});
		
		// MYRSPCA Flyout menu
		$("#hardcoded-nav-level-0 #nav-myrspca-container")
		.mouseover(function() {
			closeFlyouts();
			flyoutOnItem(".nav-level-0 .selected a");
			if ($("#site-nav-container-level-1").is(":visible")){
				$("#site-nav-container-level-1").addClass("nav-selected-sticky-flyout");
			}
			$("#hardcoded-nav-level-0 .nested_nav").show();
			// Add class for styling
			$("#hardcoded-nav-level-0 .nav-myrspca").addClass("myrspca-nav-open");
			// Line-up menu with container
			var myrspca_nav_height = $("#hardcoded-nav-level-0 #nav-myrspca-container").height();
			var myrspca_offset = $("#hardcoded-nav-level-0 #nav-myrspca-container").offset();
									
			var myrspcaAdjustPos = $("body").width()-myrspca_offset.left;			

			if((myrspcaAdjustPos < $("#nav-myrspca-container ul").width())){
				var newPos = myrspca_offset.left - ($("#nav-myrspca-container ul").width() - myrspcaAdjustPos );			    
				$("#hardcoded-nav-level-0 .nested_nav").offset({top: myrspca_offset.top + myrspca_nav_height, left: newPos});
			}else{
			    $("#hardcoded-nav-level-0 .nested_nav").offset({top: myrspca_offset.top + myrspca_nav_height, left: myrspca_offset.left});  
			}
		})
		.mouseout(function(){
			$("#hardcoded-nav-level-0 .nested_nav").hide();
			$(".myrspca-nav-open").removeClass("myrspca-nav-open");
		});
		
        jQuery('<script/>', {type: 'application/javascript', src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=jwils'}).appendTo('head');
	});
});