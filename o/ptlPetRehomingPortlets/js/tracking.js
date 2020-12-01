function sendEvent(theCategory, theAction, theLabel){
	if (typeof(ga) !== 'undefined') {
		//check the mandatory values passed in are not blank
		if(theCategory != null && theAction != null){
			//Check whether we have a label or not
			if( theLabel != null ){
				ga('send', {
				  'hitType': 'event',
				  'eventCategory': theCategory,
				  'eventAction': theAction,
				  'eventLabel': theLabel
				});
			} else {
				ga('send', {
				  'hitType': 'event',
				  'eventCategory': theCategory,
				  'eventAction': theAction
				});
			}
		}
	}
}