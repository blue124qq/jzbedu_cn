/*1603272156000*/
AUI().ready("liferay-hudcrumbs","liferay-navigation-interaction","liferay-sign-in-modal",function(A){var navigation=A.one("#navigation");if(navigation)navigation.plug(Liferay.NavigationInteraction);var siteBreadcrumbs=A.one("#breadcrumbs");if(siteBreadcrumbs)siteBreadcrumbs.plug(A.Hudcrumbs);var signIn=A.one("li.sign-in a");if(signIn&&signIn.getData("redirect")!=="true")signIn.plug(Liferay.SignInModal)});
function hideshow(){var btnvalue=document.getElementById("showHideButton").value;if(btnvalue=="show"){$("body").addClass("hideLayout");$(".control-menu-level-2").css("display","none");$(".portlet-topper").css("position","absolute");$("#showHideButton").val("hide");$("#showHideButton").text("Show")}else if(btnvalue=="hide"){$("body").removeClass("hideLayout");$(".control-menu-level-2").removeAttr("style");$(".portlet-topper").css("position","relative");$("#showHideButton").val("show");$("#showHideButton").text("Hide")}}
jQuery(function(){var $=jQuery;$.noConflict();$(document).ready(function(){if($.cookieBar)$.cookieBar({message:"This site uses cookies to provide a great user experience.",acceptButton:true,acceptText:"Allow cookies",declineButton:false,policyButton:true,policyText:"how we use cookies.",policyURL:"/utilities/privacy",autoEnable:true,acceptOnContinue:false,forceShow:false,effect:"fade",element:"#footerNav",append:true,fixed:true,bottom:true,zindex:"100"});if(typeof ga!="undefined"){$(".custom-print a").click(function(){ga("send",
"event","Print Page",getPageTitle(),$(this).attr("href"))});$(".print-action a").click(function(){ga("send","event","Print Page",getPageTitle(),$(this).attr("href"))});$(".gat-button").click(function(event){var category=$(event.currentTarget).data("ga-cat");var action=$(event.currentTarget).data("ga-act");var label=$(event.currentTarget).data("ga-lab");ga("send","event",category,action,label)})}if($("body").hasClass("staging")){var html='\x3cbutton class\x3d"showhidebutton" type\x3d"show" onclick\x3d"hideshow();" value\x3d"show" id\x3d"showHideButton" style\x3d"float: left;color: black;"\x3eHide\x3c/button\x3e';
$(".control-menu.control-menu-level-1").prepend(html)}})});