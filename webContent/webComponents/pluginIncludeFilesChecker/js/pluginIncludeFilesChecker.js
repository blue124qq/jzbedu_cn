jQuery(document).ready(function($) {
	jQuery.pluginIncludeFileChecker = function(source, type) {
		if (type == "script") {
			if ($("script[src='" + source + "']").length == 0) {
				importScript(source);
			}
		}
		if (type == "link") {
			if ($("link[href='" + source + "']").length == 0) {
				importStlying(source);
			}
		}
		function importScript(source) {
			jQuery('<script/>', {
				type : 'application/javascript',
				src : source
			}).appendTo('head');
		}
		function importStlying(source) {
			jQuery('<link/>', {
				type : 'text/css',
				href : source,
				rel : 'stylesheet'
			}).appendTo('head');
		}
	}
});