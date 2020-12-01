jQuery(function() {
	var $=jQuery;
	$(document).ready(function() {
		$("#main-menu-show").click(function (event) {
			$("#navigationTop ul#main-menu-bar").toggleClass("showNav");
			$("#navigationTop ul#myRSPCAMenu").removeClass("showNav");
			$("#navigationTop ul#myRSPCAMenu .myRSPCAOptions").hide();
			event.stopPropagation();
			return false;
		});
				
		$(document).on('click', 'a:not(#main-menu-show)', function(event) {
			warn($(this).attr("href"), event);
		});
		
		$(document).on('click', 'li', function(event) {
			if(!event.isPropagationStopped()) {
				warn(event.target.href,event );
			}
		});
		adjustStickyBreadcrumb();
		$(window).on("scroll resize", function () {
			adjustBreadcrumb();
		});  
		if($.cookieBar){
			$.cookieBar({
			    message: 'This site uses cookies to provide a great user experience.', //Message displayed on bar
				acceptButton: true, //Set to true to show accept/enable button
				acceptText: 'Allow cookies', //Text on accept/enable button
				declineButton: false, //Set to true to show decline/disable button
				policyButton: true, //Set to true to show Privacy Policy button
				policyText: 'how we use cookies.', //Text on Privacy Policy button
				policyURL: '/utilities/privacy', //URL of Privacy Policy
				autoEnable: true, //Set to true for cookies to be accepted automatically. Banner still shows
				acceptOnContinue: false, //Set to true to silently accept cookies when visitor moves to another page
				forceShow: false, //Force cookieBar to show regardless of user cookie preference
				effect: 'fade', //Options: slide, fade, hide
				element: '#footer-banner', //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
				append: true, //Set to true for cookieBar HTML to be placed at base of website. Actual position may change according to CSS
				fixed: true, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
				bottom: true, //Force CSS when fixed, so bar appears at bottom of website
				zindex: '100' //Can be set in CSS, although some may prefer to set here
			});
		}
		
	});
	function adjustBreadcrumb(){
		if($('#nav-and-heading-tabs .mobile-only').is(':visible') && $('#breadCrumb').size() > 0){
			if($(window).scrollTop() < 40){
				$('#breadCrumb,.mega-nav-portlet.sidenav').removeClass("sticky");
			}else{
				$('#breadCrumb,.mega-nav-portlet.sidenav').addClass("sticky");
			}
		}
	}
	function adjustStickyBreadcrumb(){
		if($(window).scrollTop()>0){
			adjustBreadcrumb();
		}
	}
	function warn(element,event){
		$("#navigationTop ul").removeClass("showNav");
		var elementLink=$.trim(element);
		if(!event.isPropagationStopped()){
			if($('.rspnsv').length>0){
				if($.trim($('#navigation #topLink').css("background-image"))=="none" || $.trim($('.mobile-only').css("display"))!="none"){
					//if it is not empty or '#' - in case of paging
					if (elementLink != "" && elementLink != '#'&&  checkIfNotMobileFriendlyPage(elementLink) && elementLink!="#header") {
						alert("This part of the site doesn't look good on mobile yet. We're working on it!");
					}
				}
			}
			event.stopPropagation();
		}
	}

	function checkIfNotMobileFriendlyPage(elementLink){
		var flag = false;
		if( elementLink.indexOf("/pledges") >= 0 ||
			elementLink.indexOf("calfforum.rspca.org.uk") >= 0 ||
			elementLink.indexOf("performinganimals.rspca.org.uk") >= 0 ){
			flag=true;
		}
		return flag;
	}	
});
