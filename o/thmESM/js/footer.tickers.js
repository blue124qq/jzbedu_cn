jQuery(function() {
	$(document).ready(function() {

		if(!('rssfeed' in $.fn)) {
			console.error('rssfeed plugin missing');
			// if for some reason the rssfeed plugin is missing, die gracefully instead of taking everything else with it.
			return;
		}

		$('.footer-ticker .zfeed').each(function() {
			var $container = $(this);
			var url=$container.find('.feedurl').val();
			$container.rssfeed(url, {
				snippet : false,
				header : false,
				content : false,
				titletag : 'span',
				date : false,
				limit : 3,
				media:false,
				ssl : location.protocol == "https:",
				historical : false//this is so if we have 0 results returned we send google a fresh all with time stamp appended
			}, function(e,data) {
				if(e.length > 0) {
					$container.find('.rssBody').vTicker();
				} else {
					$container.find('.rssBody').hide();
				}
			});
		});

		//apply ticker to news
		if($('.footer-listing .links').length){
			$('.footer-listing .links').vTicker();
		}
	});

});
