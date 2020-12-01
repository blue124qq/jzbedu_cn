function addWE() {
		jQuery('#snippetField')
		.tinymce(
				{
					script_url :'/o/ptlHTMLSnippetPortlet/js/tiny_mce/tiny_mce.js',

					/* General options */
					theme :"advanced",
					plugins :"safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

					/* Theme options */
					theme_advanced_buttons1 :"bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
					theme_advanced_buttons2 :"cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
					theme_advanced_buttons3 :"tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,ltr,rtl,|,fullscreen",
					theme_advanced_buttons4 :"insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,nonbreaking",
					theme_advanced_toolbar_location :"top",
					theme_advanced_toolbar_align :"left",
					theme_advanced_statusbar_location :"bottom",
					theme_advanced_resizing :true,
					convert_urls : false,
					extended_valid_elements : "iframe[src|width|height|name|align|scrolling|frameborder]",

					/* Example content CSS (should be your site CSS) */
					content_css :"/o/ptlHTMLSnippetPortlet/css/content.css"
				});
		
		
	}