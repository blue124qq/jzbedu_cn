jQuery(function() {
	var $ = jQuery;
	$(document).ready(function() {
		var url = location.href;
		$("#ratings").stars({
			captionEl : $("#stars-cap")
			
		});
		$('.submitRating').on("click",function() {
			// Retrieve instance
			var ui = $("#ratings").data("stars");
			var currValue = ui.options.value;
			var myConvertedInteger;
			myConvertedInteger = parseInt(currValue);
			// 1stVariableText is the main text prefs
			var mainText = $('.mainText').val();
			
			ga('send', 'event', 'Rating Portlet',mainText, url, myConvertedInteger);
			$(".ratingTitle").fadeOut(function() {
				$(this).text($('.thanksText').val());
			}).fadeIn();
			$("#ratings").stars({
				disabled: true
			});
			$(this).find('#submit-button').attr("disabled","disabled");
		});
	});
});