(function($) {
	var $ = jQuery;

	$(document).ready(function() {
		$( ".addCollapseHead" ).click(function() {

			$(".addCollapse").hide();
			$( ".addCollapseHead" ).css("background","url(/webContent/webComponents/rspcaStaticContent/shared/images/arrows/accordion-arrow-down.png) center right no-repeat");

			$(this).nextAll(".addCollapse").first().toggle();
			$(this).css("background","url(/webContent/webComponents/rspcaStaticContent/shared/images/arrows/accordion-arrow-up.png) center right no-repeat");

		});
	});
} (jQuery));