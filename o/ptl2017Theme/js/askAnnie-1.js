jQuery(function(){
	$ = jQuery;
	$(document).ready(function(){
		$('.ask-question').click(function(){
			openVA();
		});
	});
	function openVA(){
		var PageUrl= location.href;
		if((window.innerWidth || ($(window).width() + 15)) < 990){
			var URLMobile = "//ask.rspca.org.uk/rspcamobile/bot.htm?isJSEnabled=1&businessArea=Root.PUB&channel=Root.Mobile";
			window.open(URLMobile ,'VA','');
		}else{
			var URL = "//ask.rspca.org.uk/rspca/bot.htm?isJSEnabled=1&businessArea=Root.PUB";
			window.open(URL ,'VA','width=700,height=525');
		}
				
		
		ga('send', {
			  hitType: 'event',
			  eventCategory: 'Virtual Assistant',
			  eventAction: 'Ask Annie Image Link',
			  eventLabel: 'PageUrl'
			});
	}
});

