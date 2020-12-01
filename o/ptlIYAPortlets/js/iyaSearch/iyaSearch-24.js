jQuery(function() {
	var $ = jQuery;
	var hasGeoCoded = false;
	$(document).ready(function() {

		$('.iyaSearchPortlet').googleAddressFinder({});
		$('.iyaSearchPortlet').autopopulateGeolocation({});
		$('.iyaSearchPortlet').showGeolocationOption({});

		//Only show filters when general view selected which show info detail on click of google map marker
		$('.filterInfo').hide();
		if($('#showInfoDetailOnMap').val() == 'showInfoDetailOnMap'){
			if($('#estabTypeFilterGroupId').val() != 0 || $('#servTypeFilterGroupId').val() != 0){
				 $('.filterOptions').show();
				 $('.filterSign').html('-');
				 $('.filterInfo').show();
			}
			$('#estabTypeFilterGroupId').change(function() {
				$('#servTypeFilterGroupId').val('0');
				$('#addressSearchGoButton').click();
			});
			$('#servTypeFilterGroupId').change(function() {
				$('#estabTypeFilterGroupId').val('0');
				$('#addressSearchGoButton').click();
			});
			$('.filterLink').click(function(event) {
				  var filterVisibility = $('.filterSign').html();
				  if(filterVisibility == '+'){
					 $('.filterOptions').show();
					 $('.filterSign').html('-');
				  }else{
					  $('.filterOptions').hide();
					  $('.filterSign').html('+');
					  $('#servTypeFilterGroupId').val('0');
					  $('#estabTypeFilterGroupId').val('0');
					  $('#addressSearchGoButton').click();
				  }
				  return false;
			});
		}


		//Track event on click of page number in agenda
		$('body').on('click','.jpage-holder a', function(event) {
			var currentPage = $(this).html();
			var clickedPage = $(".jp-current").html();
			if(currentPage == '&gt;&gt;'){
				sendEvent('IYA result page', 'next', clickedPage, parseInt(clickedPage) );
			}else if(currentPage == '&lt;&lt;'){
				sendEvent('IYA result page', 'prev', clickedPage, parseInt(clickedPage) );
			}else{
				sendEvent('IYA result page', 'number', clickedPage, parseInt(clickedPage) );
			}
			/*event.stopPropagation();*/
		});

		//Track event on click of establishment in agenda
		$('#listOfObject .eachEntry').click(function() {
			var currentEsta = $(this).find('.entryName').html();
			var index = $(this).parent().index()+1;
			var currentClickedPage = $(".jp-current").html();
			if(index>10){
				index = index - ((currentClickedPage-1) * 10);
			}
			sendEvent('IYA result page', 'establishment', currentEsta, index );
		});


	});
});