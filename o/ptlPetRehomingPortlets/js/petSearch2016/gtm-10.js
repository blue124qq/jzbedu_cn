jQuery(function() {
	var $ = jQuery;
	$(document).ready(function(){
		if( $("#isSearch").length>0 ){
			//Fire search 
			if(typeof(dataLayer) !== 'undefined'){
				var animalType = $("#PSanimalType").val().toLowerCase();
				var numHits =  +$("#totalHits").val();
				var filters = $("#trackFilters").val();
				if( filters.length>0 ) {
					dataLayer.push({
					    'event': 'gtmSearch',
					    'search': {
					        'category': 'find a pet',
					        'query': animalType,
					        'results': numHits,
					        'filters' : filters
					     }
					});
				} else {
					dataLayer.push({
					    'event': 'gtmSearch',
					    'search': {
					        'category': 'find a pet',
					        'query': animalType,
					        'results': numHits
					     }
					});
				}
				console.log("search GTM fired");
			}
		}
		//Pet clicks
		$(".detailLink").on("click", function(){
			if(typeof(dataLayer) !== 'undefined'){
				var url = $(this).attr("href");
				var name = $(this).find("input.name").val();
				var type = $(this).find("input.animalType").val();
				dataLayer.push({
				    'event': 'gtmClick',
				    'element': {
				        'category': 'find a pet',
				        'subCategory': 'pet results page',
				        'name': 'search result',
				        'url': url
				        },
				    'pet': {
				        'type': type,
				        'name': name
				       }            
				});
				console.log(name + " GTM click fired");
			}
		});
		
		//Button clicks
		
		//sortArrival
		$("#sortArrival").on("click", function(){
			if(typeof(dataLayer) !== 'undefined'){
				dataLayer.push({
				    'event': 'gtmClick',
				    'element': {
				        'category': 'find a pet',
				        'subCategory': 'pet results page',
				        'name': 'sort by most recent'
				     } 
				});
				console.log("sortArrival GTM click fired");
			}
		});
		
		//sortDistance
		$("#sortDistance").on("click", function(){
			if(typeof(dataLayer) !== 'undefined'){
				dataLayer.push({
				    'event': 'gtmClick',
				    'element': {
				        'category': 'find a pet',
				        'subCategory': 'pet results page',
				        'name': 'sort by distance'
				     }  
				});
				console.log("sortDistance GTM click fired");
			}
		});
		
	});
});	