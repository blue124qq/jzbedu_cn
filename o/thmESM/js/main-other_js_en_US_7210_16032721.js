/*1603272136000*/
isTouchscreenDevice=!!("ontouchstart"in window||navigator.msMaxTouchPoints);if(isTouchscreenDevice){if(document.documentElement.className.indexOf("touchscreen-device")<0)document.documentElement.className+=" touchscreen-device"}else if(document.documentElement.className.indexOf("non-touchscreen-device")<0)document.documentElement.className+=" non-touchscreen-device";if(document.documentElement.className.indexOf("any-device")<0)document.documentElement.className+=" any-device";AUI().ready(function(){});
Liferay.Portlet.ready(function(portletId,node){});Liferay.on("allPortletsReady",function(){});
function hideshow(){var btnvalue=document.getElementById("showHideButton").value;if(btnvalue=="show"){$("body").addClass("hideLayout");$(".control-menu-level-2").css("display","none");$("#showHideButton").val("hide");$("#showHideButton").text("Show")}else if(btnvalue=="hide"){$("body").removeClass("hideLayout");$(".control-menu-level-2").removeAttr("style");$("#showHideButton").val("show");$("#showHideButton").text("Hide")}}
jQuery(function(){var $=jQuery;function searchFunc(){if($("#searchText").val()=="Search")$("#searchText").val("")}function signUpFunc(){if($("#footer-emailsignup").val()=="Enter your email address")$("#footer-emailsignup").val("")}$("#searchText").blur(searchFunc).click(searchFunc);$("#footer-emailsignup").blur(signUpFunc).click(signUpFunc);$("#footer-emailsignup").parent().submit(function(e){var d=new Date;d.setTime(d.getTime()+1E3*20);if($("#footer-emailsignup").val()!=""){var emailParts=$("#footer-emailsignup").val().split("@");
document.cookie="cnst_eml\x3d"+emailParts.join("#at#")+";expires\x3d"+d.toUTCString()+";path\x3d/"}});$(".addthis_toolbox a").click(function(){var claz=$(this).attr("class").split(" ");claz=claz[0].split("addthis_button_")[1];_gaq.push(["_trackEvent","addthis",claz,location.href])});$('a[href*\x3d"asset\x3ddocument"], a[href*\x3d"content."]').click(function(){_gaq.push(["_trackEvent","Document Download",getPageTitle(),$(this).text()])});$('a[href*\x3d"/documents/"]').click(function(){_gaq.push(["_trackEvent",
"Document Download",getPageTitle(),$(this).text()])});$('a[href^\x3d"http"]').not('a[href*\x3d"rspca.org.uk"]').click(function(){_gaq.push(["_trackEvent","External Links",getPageTitle(),$(this).attr("href")])});function getPageTitle(){var articleName=$("meta[name\x3dARTICLE_NAME]").attr("content");if(articleName==null){var articleName=document.title;if(articleName.match(/^rspca.org.uk/))articleName=articleName.substring(articleName.indexOf("-")+2)}return articleName}$(document).ready(function(){if(document.getElementById("noPageTracking")==
null)ga("require","GTM-TM2W2H6");if($("body").hasClass("staging")){var html='\x3cbutton class\x3d"showhidebutton" type\x3d"show" onclick\x3d"hideshow();" value\x3d"show" id\x3d"showHideButton" style\x3d"float: left;color: black;"\x3eHide\x3c/button\x3e';$(".control-menu.control-menu-level-1").prepend(html)}});$(window).on("load",function(){if($(".noStripeTheme").size()<1)if($(".defaultTheme").size()>0)if($(".rspca-layout-01-15").size()>0&&$("#spotlight").size()>0){var alignmentPos=$("#1 .side").offset().top;
var startingPos="left "+alignmentPos+"px";var endPos=$("#column-6").offset().top;-10;var stripeHeight=endPos-alignmentPos;stripeHeight="20px "+stripeHeight+"px";$("body").css("background-position",startingPos);$("body").css("background-size",stripeHeight)}else if($("#column-2").size()>0){if($(".portlet-dockbar").size()>0)var temp="left "+($("#column-2").offset().top-10)+"px";else var temp="left "+$("#column-2").offset().top+"px";$("body").css("background-position",temp)}})});var _gaq=jQuery.noConflict();
var $=jQuery.noConflict();
(function(_gaq){_gaq.extend({push:function(options){if($.trim(options[0])=="_trackEvent"){var send="send";var event="event";var category="";var action="";var label="";var value="";if(options.length>=3){category=$.trim(options[1]);action=$.trim(options[2])}if(options.length>=4)label=$.trim(options[3]);if(options.length==5)value=$.trim(options[4]);if(category.length>0&&action.length>0&&label.length>0&&value.length>0)ga(send,event,category,action,label,value);else if(category.length>0&&action.length>
0&&label.length>0)ga(send,event,category,action,label);else if(category.length>0&&action.length>0)ga(send,event,category,action)}else if($.trim(options[0])=="_addTrans"){ga("require","ecommerce");ga("ecommerce:addTransaction",{"id":$.trim(options[1]),"affiliation":$.trim(options[2]),"revenue":$.trim(options[3]),"shipping":"","tax":""})}else if($.trim(options[0])=="_addItem"){ga("require","ecommerce");ga("ecommerce:addItem",{"id":$.trim(options[1]),"name":$.trim(options[3]),"sku":$.trim(options[2]),
"category":$.trim(options[4]),"price":$.trim(options[5]),"quantity":$.trim(options[6])})}else if($.trim(options[0])=="_trackTrans"){ga("require","ecommerce");ga("ecommerce:send")}}})})(jQuery);